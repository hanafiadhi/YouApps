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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const services_1 = require("../common/constants/services");
const microservices_1 = require("@nestjs/microservices");
let UserService = class UserService {
    constructor(clientUser) {
        this.clientUser = clientUser;
    }
    async create(createUserDto) {
        const user = await (0, rxjs_1.firstValueFrom)(this.clientUser.send('create-user', createUserDto));
        return user;
    }
    async findAll(payload) {
        const getListUser = await (0, rxjs_1.firstValueFrom)(this.clientUser.send('get-user-list', payload));
        return getListUser;
    }
    async findOne(userId) {
        const getUser = await (0, rxjs_1.firstValueFrom)(this.clientUser.send('get-user', userId));
        if (!getUser)
            throw new common_1.NotFoundException('Data tidak ditemukan');
        return getUser;
    }
    async update(userId, updateUserDto) {
        const updateUser = await (0, rxjs_1.firstValueFrom)(this.clientUser.send('update-user', { data: updateUserDto, userId }));
        return updateUser;
    }
    async remove(userId) {
        const deleteUser = await (0, rxjs_1.firstValueFrom)(this.clientUser.send('delete-user', userId));
        if (deleteUser.deleted == 0)
            throw new common_1.NotFoundException('Data tidak ditemukan');
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(services_1.USER_QUEUE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], UserService);
//# sourceMappingURL=user.service.js.map