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
exports.UpdateReservationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const dto_1 = require("./dto");
class UpdateReservationDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3, {
        message: 'Name is too short',
    }),
    class_validator_1.MaxLength(20, {
        message: 'Name is too long',
    }),
    __metadata("design:type", String)
], UpdateReservationDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], UpdateReservationDto.prototype, "personNumber", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], UpdateReservationDto.prototype, "veganNumber", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Date)
], UpdateReservationDto.prototype, "dateFrom", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Date)
], UpdateReservationDto.prototype, "dateTo", void 0);
__decorate([
    swagger_1.ApiProperty({ type: 'integer', isArray: true }),
    class_validator_1.IsOptional(),
    __metadata("design:type", Array)
], UpdateReservationDto.prototype, "programs", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => dto_1.Dto),
    __metadata("design:type", dto_1.Dto)
], UpdateReservationDto.prototype, "country", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => dto_1.Dto),
    __metadata("design:type", dto_1.Dto)
], UpdateReservationDto.prototype, "accommodation", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => dto_1.Dto),
    __metadata("design:type", dto_1.Dto)
], UpdateReservationDto.prototype, "food", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => dto_1.Dto),
    __metadata("design:type", dto_1.Dto)
], UpdateReservationDto.prototype, "payment", void 0);
exports.UpdateReservationDto = UpdateReservationDto;
//# sourceMappingURL=update-reservation.dto.js.map