import { HealthIndicatorResult, MicroserviceHealthIndicator } from '@nestjs/terminus';
import { RmqService } from '../providers/queue/rabbitmq/rmq.service';
import { ConfigService } from '@nestjs/config';
export declare class RmqHealthIndicator extends MicroserviceHealthIndicator {
    private readonly rmqService;
    private readonly configService;
    constructor(rmqService: RmqService, configService: ConfigService);
    isHealthQueue(key: string): Promise<HealthIndicatorResult>;
    isHealthConsumer(key: string): Promise<HealthIndicatorResult>;
}
