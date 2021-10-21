import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return { message: 'Hello World!' };
  }

  getBonjour(): string {
    return 'Bonjour le Monde! Nest ';
  }
}
