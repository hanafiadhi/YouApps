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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const services_1 = require("../common/constants/services");
let AuthGuard = class AuthGuard {
    constructor(client) {
        this.client = client;
    }
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        return this.client
            .send('validate:user', req.headers['authorization']?.split(' ')[1].replace('",', ''))
            .pipe((0, rxjs_1.tap)((res) => {
            this.addUser(res, context);
        }), (0, rxjs_1.catchError)(() => {
            throw new common_1.UnauthorizedException();
        }));
    }
    addUser(user, context) {
        if (user === false) {
            throw new common_1.UnauthorizedException();
        }
        if (context.getType() === 'rpc') {
            context.switchToRpc().getData().user = user;
        }
        else if (context.getType() === 'http') {
            context.switchToHttp().getRequest().user = user;
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    __param(0, (0, common_1.Inject)(services_1.AUTH_QUEUE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], AuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map