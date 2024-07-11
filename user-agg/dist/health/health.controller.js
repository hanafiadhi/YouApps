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
exports.HealthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const health_service_1 = require("./health.service");
const swagger_1 = require("@nestjs/swagger");
const services_1 = require("../common/constants/services");
let HealthController = class HealthController {
    constructor(health, rmqHealthIndicator) {
        this.health = health;
        this.rmqHealthIndicator = rmqHealthIndicator;
    }
    async check() {
        return await this.health.check([
            async () => this.rmqHealthIndicator.isHealthConsumer(services_1.AUTH_QUEUE),
            async () => this.rmqHealthIndicator.isHealthConsumer(services_1.USER_QUEUE),
        ]);
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Version)('1'),
    (0, swagger_1.ApiTags)('Health'),
    (0, terminus_1.HealthCheck)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "check", null);
exports.HealthController = HealthController = __decorate([
    (0, common_1.Controller)('user/health'),
    __metadata("design:paramtypes", [terminus_1.HealthCheckService,
        health_service_1.RmqHealthIndicator])
], HealthController);
//# sourceMappingURL=health.controller.js.map