import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { RmqService } from './providers/queue/rabbbitmq/rmq.service';
import { RmqOptions } from '@nestjs/microservices';
import * as chalk from 'chalk';

import { REDIS } from './common/constants/service';
import { ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const env: string = configService.get<string>('app.appEnv');
  const appName: string = configService.get<string>('app.appName');
  const redisHost: string = configService.get<string>('database.redis.host');
  const redisPort: string = configService.get<string>('database.redis.port');
  const username: string = configService.get<string>('database.redis.username');
  const password: string = configService.get<string>('database.redis.password');
  const rmqService = app.get<RmqService>(RmqService);

  const rabbitMQ = app.connectMicroservice<RmqOptions>(
    rmqService.getOptions(REDIS, true),
  );
  await app.startAllMicroservices();
  const warning = chalk.hex('#789461'); // Orange color
  console.log(`\n`);
  console.log(
    warning(
      `+================================================================================================================+`,
    ),
  );
  console.log(
    warning(`
      ███        ▄█    █▄     ▄█  ███▄▄▄▄      ▄█   ▄█▄    ▄████████      ████████▄     ▄████████  ▄█    █▄
  ▀█████████▄   ███    ███   ███  ███▀▀▀██▄   ███ ▄███▀   ███    ███      ███   ▀███   ███    ███ ███    ███
     ▀███▀▀██   ███    ███   ███▌ ███   ███   ███▐██▀     ███    █▀       ███    ███   ███    █▀  ███    ███
      ███   ▀  ▄███▄▄▄▄███▄▄ ███▌ ███   ███  ▄█████▀      ███             ███    ███  ▄███▄▄▄     ███    ███
      ███     ▀▀███▀▀▀▀███▀  ███▌ ███   ███ ▀▀█████▄    ▀███████████      ███    ███ ▀▀███▀▀▀     ███    ███
      ███       ███    ███   ███  ███   ███   ███▐██▄            ███      ███    ███   ███    █▄  ███    ███
      ███       ███    ███   ███  ███   ███   ███ ▀███▄    ▄█    ███      ███   ▄███   ███    ███ ███    ███
     ▄████▀     ███    █▀    █▀    ▀█   █▀    ███   ▀█▀  ▄████████▀       ████████▀    ██████████  ▀██████▀
                                        ▀
  `),
  );
  console.log(
    warning(
      `+================================================================================================================+`,
    ),
  );
  console.log(`\n`);
  console.log(chalk('APPLICATION'));
  console.log(
    '+----------------------------------------------------------------------------------------------------------------+',
  );

  console.log(chalk.blue(` NAME\t\t\t: ${appName}`));
  console.log(chalk.blue(` ENVIRONMENT\t\t: ${env}`));

  console.log(`\n`);
  console.log(chalk.green('DATABASE REDIS'));
  console.log(
    '+----------------------------------------------------------------------------------------------------------------+',
  );
  console.log(chalk.green(` HOST\t\t\t: ${redisHost}`));
  console.log(chalk.green(` PORT\t\t\t: ${redisPort}`));
  console.log(chalk.green(` USERNAME\t\t\t: ${username}`));
  console.log(
    chalk.green(
      ` URL\t\t\t: redis://${username}:${password}@${redisHost}:${redisPort}`,
    ),
  );

  console.log(`\n`);

  console.log(chalk.yellow('RABBIT MQ'));
  console.log(
    '+----------------------------------------------------------------------------------------------------------------+',
  );
  console.log(chalk.yellow(` URL\t\t\t: ${rabbitMQ['server']['urls']}`));
  console.log(chalk.yellow(` QUEUE\t\t\t: ${REDIS.toLowerCase()}`));
  console.log(
    chalk.yellow(
      ` MESSAGE PATTERN\t: ${Array.from(
        rabbitMQ['server']['messageHandlers'].keys(),
      )}`,
    ),
  );
}
bootstrap();
