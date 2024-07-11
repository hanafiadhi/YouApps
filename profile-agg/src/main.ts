import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as basicAuth from 'express-basic-auth';
import { VersioningType } from '@nestjs/common';
import { DocumentSwagger } from './common/swagger/document/document';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  app.enableCors();

  app.enableVersioning({
    type: VersioningType.URI,
  });
  const configService = app.get(ConfigService);
  const env: string = configService.get<string>('app.appEnv');
  const appName: string = configService.get<string>('app.appName');

  const swaggerConfig: any = configService.get<any>('swagger.config');
  const swaggerPath = swaggerConfig.documentationPath;

  if (swaggerConfig.swaggerUI === true) {
    app.use(
      [`${swaggerPath}`, `${swaggerConfig.documentationJson}`],
      basicAuth({
        challenge: true,
        users: {
          [`${swaggerConfig.swaggerUser}`]: swaggerConfig.swaggerPassword,
        },
      }),
    );
    const document = SwaggerModule.createDocument(
      app,
      new DocumentSwagger(configService).Builder(),
    );

    const swaggerOptions = configService.get<any>('plugin.swagger.options');
    SwaggerModule.setup(`${swaggerPath}`, app, document, {
      swaggerOptions: swaggerOptions,
    });
  }
  await app.listen(
    configService.get('app.port.api'),
    configService.get('app.host'),
  );
  const appUrl = await app.getUrl();
  console.log(`\n`);
  console.log(`APP NAME\t: ${appName}`);
  console.log(`ENVIRONMENT\t: ${env}`);
  console.log(`RUNNING ON \t: ${appUrl}`);
  console.log(`SWAGGER UI\t: ${appUrl}${swaggerPath}`);
}
bootstrap();
