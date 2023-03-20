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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const event_emitter_1 = require("@nestjs/event-emitter");
const user_loggedin_event_1 = require("../events/user-loggedin.event");
let AuthService = class AuthService {
    constructor(userService, jwtService, eventEmitter) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.eventEmitter = eventEmitter;
    }
    async getTokens(payload) {
        const [accessToken] = await Promise.all([
            this.jwtService.signAsync({
                id: payload.id,
                username: payload.username,
                role: payload.role,
            }, {
                secret: process.env.JWT_ACCESS_TOKEN_SECRET,
                expiresIn: process.env.JWT_ACCESS_TOKEN_EXP_TIME,
            }),
        ]);
        return {
            access_token: accessToken,
        };
    }
    async validateUser(username, password) {
        const user = await this.userService.findOneByUsername(username);
        if (!user)
            throw new common_1.HttpException(`User doesn't exist`, common_1.HttpStatus.BAD_REQUEST);
        const hashedPassword = user.password;
        const isValid = await bcrypt.compare(password, hashedPassword);
        if (!isValid)
            throw new common_1.HttpException('Wrong password', common_1.HttpStatus.UNAUTHORIZED);
        user.password = undefined;
        return user;
    }
    async login(user) {
        const payload = {
            username: user.username,
            occupation: user.occupation,
            id: user.id,
            role: user.role,
        };
        const tokens = await this.getTokens(payload);
        return tokens;
    }
    loggedInUser(payload) {
        console.log('Hello user ', payload);
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('user.logged-in'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_loggedin_event_1.UserLoggedInEvent]),
    __metadata("design:returntype", void 0)
], AuthService.prototype, "loggedInUser", null);
AuthService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        event_emitter_1.EventEmitter2])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map