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
exports.UpdateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_dto_1 = require("./create-user.dto");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const IsValidApplication_1 = require("../../common/validation/IsValidApplication");
const IsValidRole_1 = require("../../common/validation/IsValidRole");
class UpdateUserDto extends (0, mapped_types_1.PartialType)(create_user_dto_1.CreateUserDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String, minLength: 4, maxLength: 100 }, tenant_id: { required: true, type: () => String }, password: { required: true, type: () => String, minLength: 4, maxLength: 100 }, role: { required: true, type: () => [String] }, applications: { required: true, type: () => [String] } };
    }
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'silahkan masukan username yang akan di gunakan untuk login',
        example: '081234567890123',
        uniqueItems: true,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'orang yang menyewa',
        example: 'PDPxxxx',
        uniqueItems: true,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "tenant_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        description: 'Silahkan masukan password nda',
        example: 'gundamRx70',
        minimum: 8,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        isArray: true,
        required: false,
        type: String,
        example: ['ada', 'tiada', 'ada'],
    }),
    (0, class_validator_1.IsNotEmpty)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, IsValidRole_1.IsValidRole)({
        message: 'Each element in applications must be one of the following values: root, admin, dashboard',
    }),
    __metadata("design:type", Array)
], UpdateUserDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, IsValidApplication_1.IsValidApplication)({
        message: 'Each element in applications must be one of the following values: root, admin, dashboard',
    }),
    __metadata("design:type", Array)
], UpdateUserDto.prototype, "applications", void 0);
//# sourceMappingURL=update-user.dto.js.map