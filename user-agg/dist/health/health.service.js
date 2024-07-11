"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RmqHealthIndicator = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const rmq_service_1 = require("../providers/queue/rabbitmq/rmq.service");
const config_1 = require("@nestjs/config");
let RmqHealthIndicator = class RmqHealthIndicator extends terminus_1.MicroserviceHealthIndicator {
    constructor(rmqService, configService) {
        super();
        this.rmqService = rmqService;
        this.configService = configService;
    }
    async isHealthQueue(key) {
        const options = this.rmqService.getOptions(key);
        try {
            const a = await this.pingCheck(key.toLocaleLowerCase(), {
                transport: microservices_1.Transport.RMQ,
                options: {
                    urls: options.options.urls,
                    queue: options.options.queue,
                    queueOptions: {
                        durable: true,
                    },
                    noAck: true,
                    persistent: false,
                    prefetchCount: 1,
                },
            });
            return this.getStatus(key.toLocaleLowerCase(), true);
        }
        catch (error) {
            const result = this.getStatus(key.toLocaleLowerCase(), false, {
                message: error.message,
            });
            throw new terminus_1.HealthCheckError('RabbitMQ check failed', result);
        }
    }
    async isHealthConsumer(key) {
        const payload = { message: 'health check' };
        try {
            const client = microservices_1.ClientProxyFactory.create({
                transport: microservices_1.Transport.RMQ,
                options: {
                    urls: [this.configService.get('transport.rabbitmq.uri')],
                    queue: this.configService.get(`RABBIT_MQ_${key}_QUEUE`),
                    queueOptions: {
                        durable: true,
                    },
                },
            });
            await client.connect();
            await (0, rxjs_1.firstValueFrom)(client.send('health-check', payload));
            await client.close();
            return this.getStatus(key.toLocaleLowerCase(), true);
        }
        catch (error) {
            const result = this.getStatus(key.toLocaleLowerCase(), false, {
                message: error.message,
            });
            throw new terminus_1.HealthCheckError('RabbitMQ consumer check failed', result);
        }
    }
};
exports.RmqHealthIndicator = RmqHealthIndicator;
exports.RmqHealthIndicator = RmqHealthIndicator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rmq_service_1.RmqService,
        config_1.ConfigService])
], RmqHealthIndicator);
//# sourceMappingURL=health.service.js.map