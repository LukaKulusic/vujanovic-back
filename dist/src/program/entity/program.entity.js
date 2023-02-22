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
exports.Program = void 0;
const reservation_program_entity_1 = require("../../reservation-program/entity/reservation-program.entity");
const typeorm_1 = require("typeorm");
const program_enum_1 = require("./enum/program.enum");
let Program = class Program extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], Program.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Program.prototype, "title", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Program.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: program_enum_1.ProgramType,
    }),
    __metadata("design:type", String)
], Program.prototype, "type", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp', select: false }),
    __metadata("design:type", Date)
], Program.prototype, "createdDate", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'timestamp', select: false }),
    __metadata("design:type", Date)
], Program.prototype, "updatedDate", void 0);
__decorate([
    typeorm_1.OneToMany(() => reservation_program_entity_1.ReservationProgram, (programToReservation) => programToReservation.program),
    __metadata("design:type", Array)
], Program.prototype, "programsToReservation", void 0);
Program = __decorate([
    typeorm_1.Entity('program')
], Program);
exports.Program = Program;
//# sourceMappingURL=program.entity.js.map