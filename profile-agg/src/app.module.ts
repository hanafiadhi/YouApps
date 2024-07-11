import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './common/configs/index';
import { RmqModule } from './providers/queue/rabbitmq/rmq.module';

import { VolunteerModule } from './profile/volunteer.module';
import { LoggerModule } from './common/logger/logger.module';
import { HealthModule } from './health/health.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      load: config,
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
    }),
    RmqModule,
    HealthModule,
    VolunteerModule,
    LoggerModule,
  ],
})
export class AppModule {}
