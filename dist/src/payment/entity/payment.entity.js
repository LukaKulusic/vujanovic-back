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
exports.Payment = void 0;
const reservation_entity_1 = require("../../reservation/entity/reservation.entity");
const typeorm_1 = require("typeorm");
let Payment = class Payment extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], Payment.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Payment.prototype, "type", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp', select: false }),
    __metadata("design:type", Date)
], Payment.prototype, "createdDate", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'timestamp', select: false }),
    __metadata("design:type", Date)
], Payment.prototype, "updatedDate", void 0);
__decorate([
    typeorm_1.OneToMany(() => reservation_entity_1.Reservation, (reservation) => reservation.payment, {
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", Array)
], Payment.prototype, "reservations", void 0);
Payment = __decorate([
    typeorm_1.Entity('payment')
], Payment);
exports.Payment = Payment;
//# sourceMappingURL=payment.entity.js.map