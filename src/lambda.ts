import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { Server } from "http";
import { AppModule } from "./app.module";
import { Context, Handler } from "aws-lambda";
import { createServer, Response, proxy } from "aws-serverless-express";
import { eventContext } from "aws-serverless-express/middleware";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SecuritySchemeObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

const authOption: SecuritySchemeObject = {
	description: 'JWT token authorization',
	type: 'apiKey',
	in: 'header',
	scheme: 'bearer',
	bearerFormat: 'JWT',
	name: 'WWW-AUTH',
}
// const binaryMimeTypes: string[] = [];

let cachedServer: Server;
//let isServerStartInProcess = false;
async function bootstrapServer(): Promise<Server> {
	const expressApp = require('express')();
	const adapter = new ExpressAdapter(expressApp);
	const app = await NestFactory.create(AppModule, adapter);
	const options = new DocumentBuilder()
		.setTitle('Golf Api')
		.setDescription('Api desc')
		.setVersion('0.01')
		.addServer('/dev')
		.addBearerAuth(authOption)
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document);	
	app.use(eventContext());
	app.enableCors();
	await app.init();
	// return createServer(expressApp, undefined, binaryMimeTypes);
	return createServer(expressApp);
}

export const handler: Handler = async (event: any, context: Context): Promise<Response> => {
	if (!cachedServer) {
		// isServerStartInProcess = true;
		cachedServer = await bootstrapServer();
		// isServerStartInProcess = false;
	}
	return proxy(cachedServer, event, context, 'PROMISE').promise;
}