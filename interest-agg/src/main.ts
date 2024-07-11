import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as basicAuth from 'express-basic-auth';
import {
  BadRequestException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentSwagger } from './common/swagger/document/document';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        return new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: errors.reduce(
            (acc, e) => ({
              ...acc,
              [e.property]: Object.values(e.constraints),
            }),
            {},
          ),
        });
      },
    }),
  );

  app.setGlobalPrefix('api');
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
          [`${swaggerConfig.swaggerApplication}`]:
            swaggerConfig.swaggerPassword,
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
