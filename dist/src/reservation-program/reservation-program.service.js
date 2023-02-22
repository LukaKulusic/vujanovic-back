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
exports.ReservationProgramService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reservation_program_entity_1 = require("./entity/reservation-program.entity");
let ReservationProgramService = class ReservationProgramService {
    constructor(reservationProgramRepo) {
        this.reservationProgramRepo = reservationProgramRepo;
    }
    async create(reservation, program) {
        try {
            const reservationProgram = this.reservationProgramRepo.create({
                reservation,
                program,
            });
            await this.reservationProgramRepo.save(reservationProgram);
            return reservationProgram;
        }
        catch (error) {
            throw new common_1.BadGatewayException(error.message);
        }
    }
    async deleteByReservationId(id) {
        return await this.reservationProgramRepo
            .createQueryBuilder()
            .delete()
            .from(reservation_program_entity_1.ReservationProgram)
            .where('reservation.id = :id', { id })
            .execute();
    }
};
ReservationProgramService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(reservation_program_entity_1.ReservationProgram)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReservationProgramService);
exports.ReservationProgramService = ReservationProgramService;
//# sourceMappingURL=reservation-program.service.js.map