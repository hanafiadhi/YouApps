import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import helmet from 'helmet';
import * as basicAuth from 'express-basic-auth';
// import * as csurf from 'csurf';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentSwagger } from '@app/common';
import { AUTH_SERVICE } from '@app/common';
import { RmqService } from './providers/queue/rabbbitmq/rmq.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  //   app.use(csurf());
  const configService = app.get(ConfigService);
  const env: string = configService.get<string>('app.appEnv');
  const appName: string = configService.get<string>('app.appName');
  const swaggerConfig: any = configService.get<any>('swagger.config');
  const swaggerPath = swaggerConfig.documentationPath;
  const rmqService = app.get<RmqService>(RmqService);

  const service = await app.connectMicroservice(
    rmqService.getOptions(AUTH_SERVICE, true),
  );
  await app.startAllMicroservices();

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
