import { Controller, Get, Version } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { RmqHealthIndicator } from './health.service';
import { AUTH_SERVICE } from '../common';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth/health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private rmqHealthIndicator: RmqHealthIndicator,
  ) {}

  @Get()
  @Version('1')
  @ApiTags('Health')
  @HealthCheck()
  check() {
    return this.health.check([
      async () => this.rmqHealthIndicator.isHealthConsumer(AUTH_SERVICE),
    ]);
  }
}
