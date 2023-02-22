"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reservation_service_1 = require("./reservation.service");
const reservation_controller_1 = require("./reservation.controller");
const reservation_entity_1 = require("./entity/reservation.entity");
const program_service_1 = require("../program/program.service");
const program_module_1 = require("../program/program.module");
const program_entity_1 = require("../program/entity/program.entity");
const reservation_program_entity_1 = require("../reservation-program/entity/reservation-program.entity");
const reservation_program_module_1 = require("../reservation-program/reservation-program.module");
const reservation_program_service_1 = require("../reservation-program/reservation-program.service");
const country_module_1 = require("../country/country.module");
const country_service_1 = require("../country/country.service");
const country_entity_1 = require("../country/entity/country.entity");
const food_entity_1 = require("../food/entity/food.entity");
const accommodation_entity_1 = require("../accommodation/entity/accommodation.entity");
const food_service_1 = require("../food/food.service");
const accommodation_service_1 = require("../accommodation/accommodation.service");
const food_module_1 = require("../food/food.module");
const accommodation_module_1 = require("../accommodation/accommodation.module");
const payment_entity_1 = require("../payment/entity/payment.entity");
const payment_module_1 = require("../payment/payment.module");
const payment_service_1 = require("../payment/payment.service");
const mail_service_1 = require("../mail/mail.service");
const mail_module_1 = require("../mail/mail.module");
const user_entity_1 = require("../user/entity/user.entity");
const user_module_1 = require("../user/user.module");
const user_service_1 = require("../user/user.service");
let ReservationModule = class ReservationModule {
};
ReservationModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                reservation_entity_1.Reservation,
                program_entity_1.Program,
                reservation_program_entity_1.ReservationProgram,
                country_entity_1.Country,
                food_entity_1.Food,
                accommodation_entity_1.Accommodation,
                payment_entity_1.Payment,
                user_entity_1.User,
            ]),
            user_module_1.UserModule,
            program_module_1.ProgramModule,
            payment_module_1.PaymentModule,
            reservation_program_module_1.ReservationProgramModule,
            country_module_1.CountryModule,
            food_module_1.FoodModule,
            accommodation_module_1.AccommodationModule,
            mail_module_1.MailModule,
        ],
        providers: [
            user_service_1.UserService,
            payment_service_1.PaymentService,
            reservation_service_1.ReservationService,
            program_service_1.ProgramService,
            reservation_program_service_1.ReservationProgramService,
            country_service_1.CountryService,
            food_service_1.FoodService,
            accommodation_service_1.AccommodationService,
            mail_service_1.MailService,
        ],
        controllers: [reservation_controller_1.ReservationController],
        exports: [reservation_service_1.ReservationService],
    })
], ReservationModule);
exports.ReservationModule = ReservationModule;
//# sourceMappingURL=reservation.module.js.map