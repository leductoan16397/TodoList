import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return { message: 'Hello World!' };
  }

  getStart(): any {
    return {
      api: {
        hello: '/hello',
        addTodo: 'POST /todo',
        getUserTodo: 'GET /todo',
        updateTodo: 'PUT /todo/:id',
        removeTodo: 'DELETE /todo/:id',
      },
    };
  }
}
