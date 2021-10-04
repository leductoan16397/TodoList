import { Server } from 'http';
import { createServer } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';

import { NestFactory, NestApplication } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const express = require('express');

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
  await app.init();
  const intance = createServer(expressApp, undefined, binaryMimeTypes);

  return { app, intance };
}
