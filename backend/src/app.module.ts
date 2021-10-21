import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { CoreModule } from './core/core.module';
import { ConfigService } from './core/config/config.service';

@Module({
  imports: [
    CoreModule,
    MongooseModule.forRootAsync({
      imports: [CoreModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.mongoUrl,
        useNewUrlParser: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
      }),
      inject: [ConfigService],
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.error('We are here inside App module');
  }
}
