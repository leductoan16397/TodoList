import { Handler, Context } from 'aws-lambda';
import { proxy } from 'aws-serverless-express';

import { bootstrapServer, IBootstrapServer } from './app';

let cachedServer: IBootstrapServer;

export const handler: Handler = async (event: any, context: Context) => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }

  return proxy(cachedServer.intance, event, context, 'PROMISE').promise;
};
