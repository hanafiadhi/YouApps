import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { HealthController } from '../src/health/health.controller';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('RabbitMQ Connection And MongoDb Connection', () => {
  let app: INestApplication;
  let health: HealthController;
  let testing: TestService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();
    app = module.createNestApplication();
    health = app.get(HealthController);
    testing = app.get(TestService);
    await app.init(); // Ensure the application is initialized
  });

  afterAll(async () => {
    await app.close(); // Ensure the application is closed
  });

  describe('Health Check', () => {
    it('should check Health Check', async () => {
      const response = await health.check();

      expect(response.status).toBe('ok');
      expect(response.info).toBeDefined();

      expect(response.info['profile']['status']).toBe('up');
    });
  });

  describe('Ping Database', () => {
    it('should be able Ping database', async () => {
      const respone = await testing.pingMongoDB();
      expect(respone).toBe('MongoDB ping successful');
    });
  });
});
