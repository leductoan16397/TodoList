"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_serverless_express_1 = require("aws-serverless-express");
const app_1 = require("./app");
let cachedServer;
exports.handler = async (event, context) => {
    if (!cachedServer) {
        cachedServer = await app_1.bootstrapServer();
    }
    return aws_serverless_express_1.proxy(cachedServer.intance, event, context, 'PROMISE').promise;
};
//# sourceMappingURL=lambda.js.map