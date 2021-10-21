import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(createTodoDto: CreateTodoDto): Promise<TodoDocument> {
    const newTodo = new this.todoModel(createTodoDto);
    return await newTodo.save();
  }

  async findAll(): Promise<TodoDocument[]> {
    const todos: TodoDocument[] = await this.todoModel.find();
    return todos;
  }

  async findOne(id: number): Promise<TodoDocument> {
    const todo: TodoDocument = await this.todoModel.findById(id);
    return todo;
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<TodoDocument> {
    const todo: TodoDocument = await this.todoModel.findByIdAndUpdate(
      id,
      { updateTodoDto },
      { new: true },
    );
    return todo;
  }

  async remove(id: number) {
    const status = this.todoModel.deleteOne({ id });
    return status;
  }
}
