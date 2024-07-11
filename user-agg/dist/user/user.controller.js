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
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const mongoid_validator_1 = require("../pipes/validator/mongoid.validator");
const acccess_token_guard_1 = require("../guard/acccess-token.guard");
const swagger_1 = require("@nestjs/swagger");
const user_respone_1 = require("../common/swagger/api/respone/user.respone");
const response_error_1 = require("../common/swagger/api/respone/response.error");
const response_success_1 = require("../common/swagger/api/respone/response.success");
const role_guard_1 = require("../guard/role.guard");
const roles_decorator_1 = require("../decorator/roles.decorator");
const role_enum_1 = require("../common/enum/role.enum");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    createv2(createUserDto) {
        return this.userService.create(createUserDto);
    }
    findAll(query) {
        return this.userService.findAll(query);
    }
    findOne(id) {
        return this.userService.findOne(id);
    }
    update(userId, updateUserDto) {
        return this.userService.update(userId, updateUserDto);
    }
    async remove(response, id) {
        await this.userService.remove(id);
        return response.status(200).json({
            message: 'Berhasil menghapus data',
            statuCode: 200,
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Version)('1'),
    (0, swagger_1.ApiOperation)({ summary: 'create one user' }),
    (0, swagger_1.ApiCreatedResponse)({ type: user_respone_1.UserResSuccesCreate }),
    (0, swagger_1.ApiBadRequestResponse)({ type: response_error_1.ErrorBadRequestExecption }),
    (0, common_1.Post)('user'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createv2", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, common_1.Version)('1'),
    (0, swagger_1.ApiOperation)({
        summary: 'Reliable user search',
        description: `This API allows:\n
        1. Searching data based on required fields\n
        2. Displaying multiple fields (required data, Multiple) e.g., username, email\n
        3. Sorting (ASC/DESC, Multiple fields) e.g., -username\n
        4. Pagination\n`,
        externalDocs: {
            url: '?username[regex]=hanafi&page=1&limit=10&fields=username,role&sort=-username',
            description: `
        Example: reliable search.\n
        1. fields[regex]=value -> search fields that contain the desired value, e.g., username[regex]=hanafi\n
        2. fields[in]=value -> search fields that contain the desired value of string array type\n
        3. fields[eq]=value -> search fields that contain the desired value (case sensitive)\n
        4. fields[ne]=value -> search fields that do not contain the undesired value\n
        5. fields[or]=value -> search fields that contain the desired value and can be combined
      `,
        },
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'sort', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'fields', required: false, type: String }),
    (0, swagger_1.ApiBadRequestResponse)({ type: response_error_1.ErrorBadRequestExecption }),
    (0, swagger_1.ApiOkResponse)({ type: response_success_1.Pagination }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, swagger_1.ApiOperation)({ summary: 'find one user' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: '_id MongoDB',
    }),
    (0, swagger_1.ApiOkResponse)({ type: user_respone_1.UserResSuccesCreate }),
    (0, swagger_1.ApiBadRequestResponse)({ type: response_error_1.ErrorBadRequestExecption }),
    (0, swagger_1.ApiNotFoundResponse)({ type: response_error_1.ErrorNotFoundExeption }),
    (0, common_1.Get)('user/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id', mongoid_validator_1.MongoIdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, common_1.Patch)('user/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'update one user' }),
    (0, swagger_1.ApiOkResponse)({ type: user_respone_1.UserResSuccesCreate }),
    (0, swagger_1.ApiBadRequestResponse)({ type: response_error_1.ErrorBadRequestExecption }),
    (0, swagger_1.ApiNotFoundResponse)({ type: response_error_1.ErrorNotFoundExeption }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: '_id MongoDB',
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id', mongoid_validator_1.MongoIdValidationPipe)),
    __param(1, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Version)('1'),
    (0, swagger_1.ApiOperation)({ summary: 'remove one user' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        required: true,
        description: '_id MongoDB',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ type: response_error_1.ErrorBadRequestExecption }),
    (0, swagger_1.ApiOkResponse)({ type: response_success_1.DeletingData }),
    (0, swagger_1.ApiNotFoundResponse)({ type: response_error_1.ErrorNotFoundExeption }),
    (0, common_1.Delete)('user/:id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id', mongoid_validator_1.MongoIdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiBearerAuth)('jwt'),
    (0, common_1.UseGuards)(acccess_token_guard_1.AccessTokenGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Role)(role_enum_1.Roles.ROOT),
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map