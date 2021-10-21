import { Module, OnModuleInit } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigService } from './config/config.service';
import {
  AllExceptionsFilter,
  HttpExceptionFilter,
  NotFoundExceptionFilter,
} from './exception/http-error.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Module({
  providers: [
    // { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_FILTER, useClass: NotFoundExceptionFilter },
    ConfigService,
  ],
  exports: [ConfigService],
})
export class CoreModule implements OnModuleInit {
  onModuleInit() {
    console.log(`CoreModule has been initialized.`);
  }
}
