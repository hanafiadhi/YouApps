import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { ConfigModule } from '@nestjs/config';
import { RmqHealthIndicator } from './health.service';
import { RmqModule } from '../providers/queue/rabbbitmq/rmq.module';
import { VOLUNTEER } from '../common/constants/service';

@Module({
  imports: [
    TerminusModule,
    ConfigModule,
    RmqModule.register({ name: VOLUNTEER }),
  ],
  controllers: [HealthController],
  providers: [RmqHealthIndicator],
})
export class HealthModule {}
