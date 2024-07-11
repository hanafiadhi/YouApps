import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { SeedService } from './volunter.seed';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const seedService = appContext.get(SeedService);
  await seedService.seed();
  await appContext.close();
}

bootstrap();
