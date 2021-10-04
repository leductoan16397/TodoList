import { Server } from 'http';
import { NestApplication } from '@nestjs/core';
export interface IBootstrapServer {
    app: NestApplication;
    intance: Server;
}
export declare function bootstrapServer(): Promise<IBootstrapServer>;
