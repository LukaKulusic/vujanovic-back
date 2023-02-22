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
exports.ReservationProgram = void 0;
const program_entity_1 = require("../../program/entity/program.entity");
const reservation_entity_1 = require("../../reservation/entity/reservation.entity");
const typeorm_1 = require("typeorm");
let ReservationProgram = class ReservationProgram extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], ReservationProgram.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => reservation_entity_1.Reservation, (reservation) => reservation.programsToReservation, {
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", reservation_entity_1.Reservation)
], ReservationProgram.prototype, "reservation", void 0);
__decorate([
    typeorm_1.ManyToOne(() => program_entity_1.Program, (program) => program.programsToReservation, {
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", program_entity_1.Program)
], ReservationProgram.prototype, "program", void 0);
ReservationProgram = __decorate([
    typeorm_1.Entity('reservation_program')
], ReservationProgram);
exports.ReservationProgram = ReservationProgram;
//# sourceMappingURL=reservation-program.entity.js.map