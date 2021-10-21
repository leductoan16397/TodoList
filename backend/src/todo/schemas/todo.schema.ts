import { Document } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  collection: 'todos',
})
export class Todo {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  name: string;
}

export type TodoDocument = Todo & Document;

export const TodoSchema = SchemaFactory.createForClass(Todo);
