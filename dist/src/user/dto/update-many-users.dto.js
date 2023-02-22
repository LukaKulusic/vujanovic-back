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
exports.UpdateUsersDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateUsersDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], UpdateUsersDto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    class_validator_1.MinLength(3, {
        message: 'Name is too short',
    }),
    class_validator_1.MaxLength(20, {
        message: 'Name is too long',
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateUsersDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    class_validator_1.MinLength(3, {
        message: 'Username is too short',
    }),
    class_validator_1.MaxLength(20, {
        message: 'Username is too long',
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateUsersDto.prototype, "username", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsEmail(),
    class_validator_1.IsOptional(),
    class_validator_1.MinLength(8, {
        message: 'Email is too short',
    }),
    class_validator_1.MaxLength(14, {
        message: 'Email is too long',
    }),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateUsersDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(1),
    class_validator_1.Max(5),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateUsersDto.prototype, "role", void 0);
exports.UpdateUsersDto = UpdateUsersDto;
//# sourceMappingURL=update-many-users.dto.js.map