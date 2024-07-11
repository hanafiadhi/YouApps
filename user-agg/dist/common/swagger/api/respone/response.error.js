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
exports.ErrorNotFoundExeption = exports.ErrorBadRequestExecption = exports.ErrorUnauthorizedException = void 0;
const swagger_1 = require("@nestjs/swagger");
class ErrorUnauthorizedException {
}
exports.ErrorUnauthorizedException = ErrorUnauthorizedException;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Error when Unauthorized',
        example: "You don't have access",
    }),
    __metadata("design:type", String)
], ErrorUnauthorizedException.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'status  when Unauthorized',
        example: '401',
    }),
    __metadata("design:type", Number)
], ErrorUnauthorizedException.prototype, "statusCode", void 0);
class ErrorBadRequestExecption {
}
exports.ErrorBadRequestExecption = ErrorBadRequestExecption;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Berisikan validation yang error',
        example: {
            'fild-error': ['message-error'],
        },
    }),
    __metadata("design:type", Array)
], ErrorBadRequestExecption.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Bad Request',
    }),
    __metadata("design:type", String)
], ErrorBadRequestExecption.prototype, "error", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'status code ketika Bad Request',
        example: '400',
    }),
    __metadata("design:type", Number)
], ErrorBadRequestExecption.prototype, "statusCode", void 0);
class ErrorNotFoundExeption {
}
exports.ErrorNotFoundExeption = ErrorNotFoundExeption;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Berisikan validation yang error bisa array string ataupun string saja',
        example: 'Not Found',
    }),
    __metadata("design:type", Array)
], ErrorNotFoundExeption.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Not Found',
    }),
    __metadata("design:type", String)
], ErrorNotFoundExeption.prototype, "error", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '404',
    }),
    __metadata("design:type", Number)
], ErrorNotFoundExeption.prototype, "statusCode", void 0);
//# sourceMappingURL=response.error.js.map