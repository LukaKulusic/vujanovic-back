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
exports.Food = void 0;
const reservation_description_food_entity_1 = require("../../reservation-description-food/entity/reservation-description-food.entity");
const typeorm_1 = require("typeorm");
let Food = class Food extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Food.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Food.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', select: false }),
    __metadata("design:type", Date)
], Food.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', select: false }),
    __metadata("design:type", Date)
], Food.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reservation_description_food_entity_1.ReservationDescriptionFood, (foodToDescription) => foodToDescription.food),
    __metadata("design:type", Array)
], Food.prototype, "foodToDescriptions", void 0);
Food = __decorate([
    (0, typeorm_1.Entity)('food')
], Food);
exports.Food = Food;
//# sourceMappingURL=food.entity.js.map