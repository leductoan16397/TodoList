import { Module, OnModuleInit } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [
    CoreModule,
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule implements OnModuleInit {
  onModuleInit() {
    console.log(`TodoModule has been initialized.`);
  }
}
