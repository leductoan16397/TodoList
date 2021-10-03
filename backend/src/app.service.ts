import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! Nest ';
  }

  getBonjour(): string {
    return 'Bonjour le Monde! Nest ';
  }
}
