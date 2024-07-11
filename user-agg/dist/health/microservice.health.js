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
exports.MicroserviceHealthIndicator = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
let MicroserviceHealthIndicator = class MicroserviceHealthIndicator extends terminus_1.HealthIndicator {
    constructor() {
        super();
        this.checkDependantPackages();
    }
    checkDependantPackages() {
        if (!microservices_1.ClientProxyFactory || !microservices_1.Transport) {
            throw new common_1.InternalServerErrorException('Missing NestJS microservice package');
        }
    }
    async pingMicroservice(options, timeout) {
        const client = microservices_1.ClientProxyFactory.create(options);
        try {
            await client.connect();
            await client.close();
        }
        catch (err) {
            throw new rxjs_1.TimeoutError();
        }
    }
    generateError(key, error, timeout) {
        const errorResult = this.getStatus(key, false, {
            message: error.message,
            timeout,
        });
        throw new terminus_1.HealthCheckError('Microservice check failed', errorResult);
    }
    async pingCheck(key, options, timeout = 1000) {
        try {
            await this.pingMicroservice(options, timeout);
        }
        catch (err) {
            this.generateError(key, err, timeout);
        }
        return this.getStatus(key, true);
    }
};
exports.MicroserviceHealthIndicator = MicroserviceHealthIndicator;
exports.MicroserviceHealthIndicator = MicroserviceHealthIndicator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MicroserviceHealthIndicator);
//# sourceMappingURL=microservice.health.js.map