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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const roles_enum_1 = require("../entity/enum/roles.enum");
const class_validator_1 = require("class-validator");
let User = class User extends typeorm_1.BaseEntity {
    async hashPassword() {
        if (this.password) {
            try {
                this.password =
                    this.password.length < 60
                        ? await bcrypt.hash(this.password, 10)
                        : this.password;
            }
            catch (e) {
                throw new common_1.InternalServerErrorException('There is some wrong in the hash', e.message);
            }
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('increment'),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.Length(3, 20),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    class_validator_1.Length(4, 20),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ select: false }),
    class_validator_1.Length(5, 20),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: roles_enum_1.UserRoles,
        default: roles_enum_1.UserRoles.VIEWER,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp', select: false }),
    __metadata("design:type", Date)
], User.prototype, "createdDate", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'timestamp', select: false }),
    __metadata("design:type", Date)
], User.prototype, "updatedDate", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
User = __decorate([
    typeorm_1.Entity('user')
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map