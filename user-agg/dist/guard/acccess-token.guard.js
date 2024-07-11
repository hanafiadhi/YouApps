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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const services_1 = require("../common/constants/services");
let AccessTokenGuard = class AccessTokenGuard {
    constructor(client) {
        this.client = client;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = await this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException();
        }
        try {
            request['user'] = await (0, rxjs_1.firstValueFrom)(this.client.send('verify-token', token));
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error);
        }
        return true;
    }
    async extractTokenFromHeader(request) {
        const token = request.headers.authorization?.split(' ')[1] ?? undefined;
        return token;
    }
};
exports.AccessTokenGuard = AccessTokenGuard;
exports.AccessTokenGuard = AccessTokenGuard = __decorate([
    __param(0, (0, common_1.Inject)(services_1.AUTH_QUEUE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], AccessTokenGuard);
//# sourceMappingURL=acccess-token.guard.js.map