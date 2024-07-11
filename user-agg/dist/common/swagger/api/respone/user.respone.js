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
exports.UserResSuccesCreate = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("../../../../user/dto/create-user.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class UserResSuccesCreate extends (0, mapped_types_1.PartialType)(create_user_dto_1.CreateUserDto) {
}
exports.UserResSuccesCreate = UserResSuccesCreate;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id auto generate from mongodb',
        example: '66580386572c487d00eef243',
        uniqueItems: true,
    }),
    __metadata("design:type", String)
], UserResSuccesCreate.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'admin',
        uniqueItems: true,
    }),
    __metadata("design:type", String)
], UserResSuccesCreate.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiHideProperty)(),
    __metadata("design:type", String)
], UserResSuccesCreate.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        isArray: true,
        required: true,
        type: String,
        example: ['root', 'dashboard'],
    }),
    __metadata("design:type", Array)
], UserResSuccesCreate.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        isArray: true,
        required: true,
        type: String,
        example: ['website', 'dashboard'],
    }),
    __metadata("design:type", Array)
], UserResSuccesCreate.prototype, "applications", void 0);
//# sourceMappingURL=user.respone.js.map