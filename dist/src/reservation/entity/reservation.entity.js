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
exports.Reservation = void 0;
const country_entity_1 = require("../../country/entity/country.entity");
const payment_entity_1 = require("../../payment/entity/payment.entity");
const reservation_accommodation_entity_1 = require("../../reservation-accommodation/entity/reservation-accommodation.entity");
const reservation_description_entity_1 = require("../../reservation-description/entity/reservation-description.entity");
const typeorm_1 = require("typeorm");
let Reservation = class Reservation extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("increment"),
    __metadata("design:type", Number)
], Reservation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Reservation.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Reservation.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Reservation.prototype, "dateFrom", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Reservation.prototype, "dateTo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Reservation.prototype, "personNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Reservation.prototype, "veganNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Reservation.prototype, "vegetarianNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Reservation.prototype, "glutenFreeNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], Reservation.prototype, "paymentDetails", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], Reservation.prototype, "desc", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", select: false }),
    __metadata("design:type", Date)
], Reservation.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamp", select: false }),
    __metadata("design:type", Date)
], Reservation.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservation_accommodation_entity_1.ReservationAccommodation, (accommodationToReservation) => accommodationToReservation.reservation, { cascade: true, eager: true }),
    __metadata("design:type", Array)
], Reservation.prototype, "accommodationsToReservation", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservation_description_entity_1.ReservationDescription, (description) => description.reservation),
    __metadata("design:type", Array)
], Reservation.prototype, "descriptions", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country, (country) => country.reservations, {
        cascade: true,
        nullable: true,
    }),
    __metadata("design:type", country_entity_1.Country)
], Reservation.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_entity_1.Payment, (payment) => payment.reservations, {
        cascade: true,
        nullable: true,
    }),
    __metadata("design:type", payment_entity_1.Payment)
], Reservation.prototype, "payment", void 0);
Reservation = __decorate([
    (0, typeorm_1.Entity)("reservation")
], Reservation);
exports.Reservation = Reservation;
//# sourceMappingURL=reservation.entity.js.map