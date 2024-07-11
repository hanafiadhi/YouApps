import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { RmqHealthIndicator } from './health.service';
import { ApiTags } from '@nestjs/swagger';
import { AUTH_QUEUE, INTEREST_QUEUE } from '../common/constants/services';
import { Controller, Get, Version } from '@nestjs/common';

@Controller('user/health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private rmqHealthIndicator: RmqHealthIndicator,
  ) {}

  @Get()
  @Version('1')
  @ApiTags('Health')
  @HealthCheck()
  async check() {
    return await this.health.check([
      //   async () => this.rmqHealthIndicator.isHealthQueue(AUTH_SERVICE),
      async () => this.rmqHealthIndicator.isHealthConsumer(AUTH_QUEUE),
      async () => this.rmqHealthIndicator.isHealthConsumer(INTEREST_QUEUE),
    ]);
  }
}
