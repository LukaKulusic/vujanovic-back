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
exports.ProgramDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const program_type_dto_1 = require("./program-type.dto");
class ProgramDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(1, {
        message: "Title is too short",
    }),
    class_validator_1.MaxLength(40, {
        message: "Title is too long",
    }),
    __metadata("design:type", String)
], ProgramDto.prototype, "title", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(5, {
        message: "Description is too short",
    }),
    __metadata("design:type", String)
], ProgramDto.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => program_type_dto_1.ProgramTypeDto),
    __metadata("design:type", program_type_dto_1.ProgramTypeDto)
], ProgramDto.prototype, "type", void 0);
exports.ProgramDto = ProgramDto;
//# sourceMappingURL=program.dto.js.map