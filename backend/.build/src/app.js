"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_serverless_express_1 = require("aws-serverless-express");
const middleware_1 = require("aws-serverless-express/middleware");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("./app.module");
const express = require("express");
const binaryMimeTypes = [];
async function bootstrapServer() {
    const expressApp = express();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
    app.use(middleware_1.eventContext());
    await app.init();
    const intance = aws_serverless_express_1.createServer(expressApp, undefined, binaryMimeTypes);
    return { app, intance };
}
exports.bootstrapServer = bootstrapServer;
//# sourceMappingURL=app.js.map