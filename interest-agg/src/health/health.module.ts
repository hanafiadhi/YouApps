import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';

import { ConfigModule } from '@nestjs/config';
import { RmqHealthIndicator } from './health.service';

import { RmqService } from '../providers/queue/rabbitmq/rmq.service';

@Module({
  imports: [TerminusModule, ConfigModule],
  controllers: [HealthController],
  providers: [RmqHealthIndicator, RmqService],
})
export class HealthModule {}
