import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
// import { Todo, TodoDocument } from './schemas/todo.schema';
import * as AWS from 'aws-sdk';
import { v4 as uuidV4 } from 'uuid';
import { Todo } from './entity/todo.entity';
import { ConfigService } from '../core/config/config.service';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

@Injectable()
export class TodoService {
  private _tableName: string;
  private _dynamoDB: DocumentClient;
  constructor(private readonly configService: ConfigService) {
    this._tableName = configService.todoTableName;
    AWS.config.credentials = {
      accessKeyId: configService.accessKeyId,
      secretAccessKey: configService.secretAccessKey,
    };

    this._dynamoDB = new AWS.DynamoDB.DocumentClient();
  }

  async create(createTodoDto: CreateTodoDto, username: string): Promise<any> {
    try {
      const newTodo: Todo = {
        id: uuidV4(),
        username,
        status: 'todo',
        todoName: createTodoDto.todoName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await this._dynamoDB
        .put({
          TableName: this._tableName,
          Item: newTodo,
        })
        .promise();
      return newTodo;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(username: string): Promise<any> {
    try {
      const todos = await this._dynamoDB
        .scan({
          TableName: this._tableName,
          ScanFilter: {
            username: {
              AttributeValueList: [username],
              ComparisonOperator: 'EQ',
            },
          },
        })
        .promise();
      const rs = { todo: [], inProgress: [], done: [] };
      todos.Items.forEach((item) => {
        rs[item.status].push(item);
      });
      return rs;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      const result = await this._dynamoDB
        .get({
          TableName: this._tableName,
          Key: { id },
        })
        .promise();
      return result.Item;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    todoId: string,
    user_name: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<any> {
    try {
      const result = await this._dynamoDB
        .update({
          TableName: this._tableName,
          Key: {
            id: todoId,
          },
          Expected: {
            username: {
              Value: user_name,
              ComparisonOperator: 'EQ',
            },
          },
          AttributeUpdates: {
            updatedAt: { Value: new Date().toISOString() },
            status: { Value: updateTodoDto.status },
          },
          ReturnValues: 'ALL_NEW',
        })
        .promise();
      return result.Attributes;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(todoId: string, user_name: string) {
    try {
      await this._dynamoDB
        .delete({
          TableName: this._tableName,
          Key: { id: todoId },
          Expected: {
            username: {
              Value: user_name,
              ComparisonOperator: 'EQ',
            },
          },
        })
        .promise();
      return { deleteStatus: 'done' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
