import { Controller, Get, Version } from '@nestjs/common';

import { MessagePattern, Payload } from '@nestjs/microservices';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { RmqHealthIndicator } from './health.service';
import { REDIS, VOLUNTEER } from '../common/constants/service';

@Controller('volunteer/health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private rmqHealthIndicator: RmqHealthIndicator,
  ) {}

  @Get()
  @Version('1')
  @HealthCheck()
  async check() {
    return await this.health.check([
      async () => await this.rmqHealthIndicator.isHealthQueue(REDIS),
    ]);
  }

  @MessagePattern('health-check')
  async nice(@Payload() data: any) {
    return data;
  }
}
