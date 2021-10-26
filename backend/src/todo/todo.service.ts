import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
// import { Todo, TodoDocument } from './schemas/todo.schema';
import * as AWS from 'aws-sdk';
import { v4 as uuidV4 } from 'uuid';

AWS.config.credentials = {
  accessKeyId: 'AKIAXPPKD4UJTPPDWR2X',
  secretAccessKey: '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',
};

const dynamoDB = new AWS.DynamoDB.DocumentClient();

@Injectable()
export class TodoService {
  async create(createTodoDto: any): Promise<any> {
    try {
      const newTodo = {
        id: uuidV4(),
        todoName: createTodoDto.todoName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await dynamoDB
        .put({
          TableName: process.env.TODO_TABLE_NAME || 'todos',
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
      const todos = await dynamoDB
        .scan({
          TableName: process.env.TODO_TABLE_NAME || 'todos',
        })
        .promise();
      return todos;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      const result = await dynamoDB
        .get({
          TableName: process.env.TODO_TABLE_NAME || 'todos',
          Key: { id },
        })
        .promise();
      return result.Item;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateTodoDto: any): Promise<any> {
    try {
      const result = await dynamoDB
        .update({
          TableName: process.env.TODO_TABLE_NAME || 'todos',
          Key: { id },
          UpdateExpression: 'set todoName = :t, updatedAt = :u',
          ExpressionAttributeValues: {
            ':t': updateTodoDto.todoName,
            ':u': new Date().toISOString(),
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
      await dynamoDB
        .delete({
          TableName: process.env.TODO_TABLE_NAME || 'todos',
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
