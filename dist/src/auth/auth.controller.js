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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const public_decorator_1 = require("./decorator/public.decorator");
const get_current_user_decorator_1 = require("./decorator/get-current-user.decorator");
const get_current_user_id_decorator_1 = require("./decorator/get-current-user-id.decorator");
const local_guard_1 = require("./guard/local.guard");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async login(loginData, user) {
        return this.authService.login(user);
    }
    async getUser(userId) {
        return await this.userService.getOne(userId);
    }
};
__decorate([
    public_decorator_1.Public(),
    common_1.UseGuards(local_guard_1.LocalAuthGuard),
    common_1.Post('/login'),
    __param(0, common_1.Body()),
    __param(1, get_current_user_decorator_1.GetCurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Get('/me'),
    __param(0, get_current_user_id_decorator_1.GetCurrentUserId()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUser", null);
AuthController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('Auth'),
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map