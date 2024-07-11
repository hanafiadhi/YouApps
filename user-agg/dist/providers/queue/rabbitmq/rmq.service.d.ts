import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions } from '@nestjs/microservices';
export declare class RmqService {
    private readonly configService;
    constructor(configService: ConfigService);
    getOptions(queue: string, noAck?: boolean): RmqOptions;
    ack(context: RmqContext): void;
}
