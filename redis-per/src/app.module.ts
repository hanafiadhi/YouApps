import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from './providers/queue/rabbbitmq/rmq.module';
import { MongoDbModule } from './providers/database/mongodb/mongo.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionFilter } from './common/filter/rpc-exeption.filter';
import configs from './common/configs';
import { SeedModule } from './database/seeders/seed.module';
import { LoggerModule } from './common/logger/logger.module';
import { JwtModule } from './jwt/jwt.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
    }),
    RmqModule,
    SeedModule,
    LoggerModule,
    JwtModule,
    HealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
  ],
})
export class AppModule {}
