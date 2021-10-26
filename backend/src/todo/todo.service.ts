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
    const newTodo = {
      id: uuidV4(),
      todoName: createTodoDto.todoName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    try {
      await dynamoDB
        .put({
          TableName: process.env.TODO_TABLE_NAME || 'todos',
          Item: newTodo,
        })
        .promise();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return newTodo;
  }

  async findAll(): Promise<any> {
    return { findall: true };
  }

  async findOne(id: string): Promise<any> {
    let todo;
    try {
      const result = await dynamoDB
        .get({
          TableName: process.env.TODO_TABLE_NAME || 'todos',
          Key: { id },
        })
        .promise();
      todo = result.Item;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return todo;
  }

  async update(id: string, updateTodoDto: any): Promise<any> {
    let todo;
    try {
      const result = await dynamoDB
        .update({
          TableName: process.env.TODO_TABLE_NAME || 'todos',
          Key: { id },
          UpdateExpression: 'set todoName = :n, updatedAt = :update ',
          ExpressionAttributeValues: {
            ':n': updateTodoDto.name,
            ':update': new Date().toISOString(),
          },
          ReturnValues: 'UPDATED_NEW',
        })
        .promise();
      todo = result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return todo;
  }

  async remove(id: string) {
    let todo;
    try {
      const result = await dynamoDB
        .delete({
          TableName: process.env.TODO_TABLE_NAME || 'todos',
          Key: { id },
        })
        .promise();
      todo = result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return todo;
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
