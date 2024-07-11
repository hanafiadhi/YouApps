import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from './providers/queue/rabbbitmq/rmq.module';
import { MongoDbModule } from './providers/database/mongodb/mongo.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionFilter } from './common/filter/rpc-exeption.filter';
import { ProfileModule } from './profile/profile.module';
import configs from './common/configs';
import { SeedModule } from './database/seeders/seed.module';
import { LoggerModule } from './common/logger/logger.module';
import { HealthModule } from './health/health.module';
import { HoroscopeModule } from './horoscope/horoscope.module';
import { ZozdiacModule } from './zozdiac/zozdiac.module';

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
    MongoDbModule,
    ProfileModule,
    SeedModule,
    LoggerModule,
    HealthModule,
    // HoroscopeModule,
    // ZozdiacModule,
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
