import { Server } from 'http';
import { createServer } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';

import { NestFactory, NestApplication } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
// import compression from 'compression';
// import bodyParser from 'body-parser';

const binaryMimeTypes: string[] = [];

export interface IBootstrapServer {
  app: NestApplication;
  intance: Server;
}

export async function bootstrapServer(): Promise<IBootstrapServer> {
  const expressApp = express();
  const app = await NestFactory.create<NestApplication>(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  app.use(eventContext());
  app.enableCors();
  await app.init();
  const intance = createServer(expressApp, undefined, binaryMimeTypes);

  return { app, intance };
}
