import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from '../src/health/health.controller';
import { HealthModule } from '../src/health/health.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionFilter } from '../src/common/filter/rpc-exeption.filter';
import { RmqService } from '../src/providers/queue/rabbbitmq/rmq.service';
import { RmqOptions } from '@nestjs/microservices';
import { REDIS } from '../src/common/constants/service';
import configs from '../src/common/configs';

describe('RabbitMQ Connection And MongoDb Connection', () => {
  let app: INestApplication;
  let health: HealthController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: configs,
          ignoreEnvFile: false,
          isGlobal: true,
          cache: true,
          envFilePath: ['.env'],
        }),
        HealthModule,
      ],
      providers: [
        RmqService,
        {
          provide: APP_FILTER,
          useClass: ExceptionFilter,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    health = app.get<HealthController>(HealthController);

    const rmqService = app.get<RmqService>(RmqService);
    const rabbitMQ = app.connectMicroservice<RmqOptions>(
      rmqService.getOptions(REDIS, true),
    );

    await app.startAllMicroservices();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Check redis Queue', () => {
    it('should check Health Check', async () => {
      const response = await health.check();
      expect(response.status).toBe('ok');
      expect(response.info).toBeDefined();
      expect(response.info['redis']['status']).toBe('up');
    });
  });
});
