export class Todo {
  id: string;
  username: string;
  todoName: string;
  status: 'todo' | 'inProgress' | 'done';
  createdAt: Date | string;
  updatedAt: Date | string;
}
