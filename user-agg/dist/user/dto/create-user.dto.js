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
exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const IsValidApplication_1 = require("../../common/validation/IsValidApplication");
const IsValidRole_1 = require("../../common/validation/IsValidRole");
class CreateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String, minLength: 4, maxLength: 100 }, password: { required: true, type: () => String, minLength: 4, maxLength: 100 }, role: { required: true, type: () => [String] }, applications: { required: true, type: () => [String] } };
    }
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'please insert your username to login',
        example: 'admin',
        uniqueItems: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: true,
        description: 'please insert your password',
        example: 'gundamRx70',
        minimum: 8,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        isArray: true,
        required: true,
        type: String,
        example: ['root', 'admin'],
    }),
    (0, class_validator_1.IsNotEmpty)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, IsValidRole_1.IsValidRole)({
        message: 'Each element in applications must be one of the following values: root, admin, dashboard',
    }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        isArray: true,
        required: true,
        type: String,
        example: ['dashboard', 'admin'],
    }),
    (0, class_validator_1.IsNotEmpty)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, IsValidApplication_1.IsValidApplication)({
        message: 'Each element in applications must be one of the following values: website, admin, dashboard',
    }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "applications", void 0);
//# sourceMappingURL=create-user.dto.js.map