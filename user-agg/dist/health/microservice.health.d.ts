import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { ClientOptions } from '@nestjs/microservices';
export declare class MicroserviceHealthIndicator extends HealthIndicator {
    constructor();
    private checkDependantPackages;
    private pingMicroservice;
    private generateError;
    pingCheck<MicroserviceClientOptions extends ClientOptions>(key: string, options: MicroserviceClientOptions, timeout?: number): Promise<HealthIndicatorResult>;
}
