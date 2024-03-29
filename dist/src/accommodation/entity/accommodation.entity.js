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
exports.Accommodation = void 0;
const reservation_accommodation_entity_1 = require("../../reservation-accommodation/entity/reservation-accommodation.entity");
const typeorm_1 = require("typeorm");
let Accommodation = class Accommodation extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Accommodation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Accommodation.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', select: false }),
    __metadata("design:type", Date)
], Accommodation.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', select: false }),
    __metadata("design:type", Date)
], Accommodation.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservation_accommodation_entity_1.ReservationAccommodation, (accommodationToReservation) => accommodationToReservation.reservation, { cascade: true }),
    __metadata("design:type", Array)
], Accommodation.prototype, "accommodationsToReservation", void 0);
Accommodation = __decorate([
    (0, typeorm_1.Entity)('accommodation')
], Accommodation);
exports.Accommodation = Accommodation;
//# sourceMappingURL=accommodation.entity.js.map