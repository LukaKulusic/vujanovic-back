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
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_dto_1 = require("./dto/user.dto");
const roles_decorator_1 = require("./roles.decorator");
const roles_enum_1 = require("./entity/enum/roles.enum");
const update_user_dto_1 = require("./dto/update-user.dto");
const update_many_user_dto_1 = require("./dto/update-many-user.dto");
const get_many_user_dto_1 = require("./dto/get-many-user.dto");
const get_current_user_id_decorator_1 = require("../auth/decorator/get-current-user-id.decorator");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getList(req) {
        return await this.userService.getList(req.query);
    }
    getUserById(id) {
        const user = this.userService.getOne(id);
        if (user) {
            return user;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    getMany(body) {
        const { ids } = body;
        const result = this.userService.getMany(ids);
        if (result) {
            return result;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    updateUser(id, body) {
        const updatedUser = this.userService.update(id, body);
        if (updatedUser) {
            return updatedUser;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    updateMany(body) {
        const updatedUsers = this.userService.updateMany(body.updateData);
        if (updatedUsers) {
            return updatedUsers;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createUser(body) {
        const user = this.userService.create(body);
        if (user) {
            return user;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteUser(id, userId) {
        if (id == userId) {
            throw new common_1.HttpException('Can not delete yourself!', common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.userService.delete(id);
    }
    async deleteMany(body, userId) {
        const { ids } = body;
        let array = ids;
        if (ids.includes(userId)) {
            array = ids.filter((item) => item != userId);
        }
        return await this.userService.deleteMany(array);
    }
};
__decorate([
    common_1.Get(),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_2.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getList", null);
__decorate([
    common_1.Get('/:id'),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserById", null);
__decorate([
    common_1.Post('getMany'),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_many_user_dto_1.GetManyDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getMany", null);
__decorate([
    common_1.Patch('/:id'),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
__decorate([
    common_1.Post('updateMany'),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_many_user_dto_1.UpdateManyUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateMany", null);
__decorate([
    common_1.Post(),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    common_1.Delete('/:id'),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Param('id')),
    __param(1, get_current_user_id_decorator_1.GetCurrentUserId()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    common_1.Post('deleteMany'),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Body()),
    __param(1, get_current_user_id_decorator_1.GetCurrentUserId()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_many_user_dto_1.GetManyDto, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteMany", null);
UserController = __decorate([
    swagger_1.ApiTags('User'),
    swagger_1.ApiBearerAuth(),
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map