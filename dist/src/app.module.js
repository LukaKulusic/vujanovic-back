"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const schedule_1 = require("@nestjs/schedule");
const user_module_1 = require("./user/user.module");
const typeOrmConfig = require("../typeorm.config");
const auth_module_1 = require("./auth/auth.module");
const jwt_guard_1 = require("./auth/guard/jwt.guard");
const country_module_1 = require("./country/country.module");
const program_module_1 = require("./program/program.module");
const reservation_module_1 = require("./reservation/reservation.module");
const accommodation_module_1 = require("./accommodation/accommodation.module");
const food_module_1 = require("./food/food.module");
const event_emitter_1 = require("@nestjs/event-emitter");
const payment_module_1 = require("./payment/payment.module");
const roles_guard_1 = require("./user/roles.guard");
const mail_module_1 = require("./mail/mail.module");
const logger_middleware_1 = require("./middleware/logger.middleware");
const reservation_accommodation_module_1 = require("./reservation-accommodation/reservation-accommodation.module");
const reservation_description_module_1 = require("./reservation-description/reservation-description.module");
const reservation_description_food_module_1 = require("./reservation-description-food/reservation-description-food.module");
const reservation_description_program_module_1 = require("./reservation-description-program/reservation-description-program.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            event_emitter_1.EventEmitterModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot(typeOrmConfig),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            schedule_1.ScheduleModule.forRoot(),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            passport_1.PassportModule,
            country_module_1.CountryModule,
            program_module_1.ProgramModule,
            reservation_module_1.ReservationModule,
            accommodation_module_1.AccommodationModule,
            food_module_1.FoodModule,
            payment_module_1.PaymentModule,
            mail_module_1.MailModule,
            reservation_accommodation_module_1.ReservationAccommodationModule,
            reservation_description_module_1.ReservationDescriptionModule,
            reservation_description_food_module_1.ReservationDescriptionFoodModule,
            reservation_description_program_module_1.ReservationDescriptionProgramModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map