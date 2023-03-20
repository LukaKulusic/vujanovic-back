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
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const passport_1 = require("@nestjs/passport");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const user_module_1 = require("../user/user.module");
const user_entity_1 = require("../user/entity/user.entity");
const local_strategy_1 = require("./strategy/local.strategy");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
let AuthModule = class AuthModule {
    constructor(moduleRef) {
        this.moduleRef = moduleRef;
    }
    onModuleInit() {
        const moduleRef = this.moduleRef;
    }
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            passport_1.PassportModule,
            user_module_1.UserModule,
            jwt_1.JwtModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            user_service_1.UserService,
            jwt_strategy_1.JwtStrategy,
            {
                provide: local_strategy_1.LocalStrategy,
                useFactory: async (moduleRef) => {
                    const auth = await moduleRef.resolve(auth_service_1.AuthService);
                    console.log('local start factory', { auth });
                    return new local_strategy_1.LocalStrategy(auth);
                },
                inject: [core_1.ModuleRef],
            },
        ],
    }),
    __metadata("design:paramtypes", [core_1.ModuleRef])
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map