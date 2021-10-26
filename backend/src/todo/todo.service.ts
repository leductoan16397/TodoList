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

  async create(createTodoDto: CreateTodoDto): Promise<any> {
    try {
      const newTodo: Todo = {
        id: uuidV4(),
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

  async findAll(): Promise<any> {
    try {
      const todos = await this._dynamoDB
        .scan({
          TableName: this._tableName,
        })
        .promise();
      return todos;
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

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<any> {
    try {
      const result = await this._dynamoDB
        .update({
          TableName: this._tableName,
          Key: { id },
          // UpdateExpression: 'set todoName = :t, updatedAt = :u',
          // ExpressionAttributeValues: {
          //   ':t': updateTodoDto.todoName,
          //   ':u': new Date().toISOString(),
          // },
          AttributeUpdates: {
            todoName: { Value: updateTodoDto.todoName },
            updatedAt: { Value: new Date().toISOString() },
          },
          ReturnValues: 'ALL_NEW',
        })
        .promise();
      return result.Attributes;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      await this._dynamoDB
        .delete({
          TableName: this._tableName,
          Key: { id },
        })
        .promise();
      return { deleteStatus: 'done' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
// export class TodoService {
//   constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

//   async create(createTodoDto: CreateTodoDto): Promise<TodoDocument> {
//     const newTodo = new this.todoModel(createTodoDto);
//     return await newTodo.save();
//   }

//   async findAll(): Promise<TodoDocument[]> {
//     const todos: TodoDocument[] = await this.todoModel.find();
//     return todos;
//   }

//   async findOne(id: number): Promise<TodoDocument> {
//     const todo: TodoDocument = await this.todoModel.findById(id);
//     return todo;
//   }

//   async update(
//     id: number,
//     updateTodoDto: UpdateTodoDto,
//   ): Promise<TodoDocument> {
//     const todo: TodoDocument = await this.todoModel.findByIdAndUpdate(
//       id,
//       { updateTodoDto },
//       { new: true },
//     );
//     return todo;
//   }

//   async remove(id: number) {
//     const status = this.todoModel.deleteOne({ id });
//     return status;
//   }
// }
