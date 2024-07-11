import { HealthCheckService } from '@nestjs/terminus';
import { RmqHealthIndicator } from './health.service';
export declare class HealthController {
    private health;
    private rmqHealthIndicator;
    constructor(health: HealthCheckService, rmqHealthIndicator: RmqHealthIndicator);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
