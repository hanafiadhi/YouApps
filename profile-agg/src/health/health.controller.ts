import { Controller, Get, Version } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { RmqHealthIndicator } from './health.service';
import { AUTH_SERVICE, PROFILE_SERVICE, USER_SERVICE } from '../common';
import { ApiTags } from '@nestjs/swagger';

@Controller('profile/health')
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
      async () => this.rmqHealthIndicator.isHealthConsumer(AUTH_SERVICE),
      async () => this.rmqHealthIndicator.isHealthConsumer(PROFILE_SERVICE),
      async () => this.rmqHealthIndicator.isHealthConsumer(USER_SERVICE),
    ]);
  }
}
