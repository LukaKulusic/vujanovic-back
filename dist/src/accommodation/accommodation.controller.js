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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccommodationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
const accommodation_dto_1 = require("./dto/accommodation.dto");
const roles_enum_1 = require("../user/entity/enum/roles.enum");
const roles_decorator_1 = require("../user/roles.decorator");
const accommodation_service_1 = require("./accommodation.service");
const get_many_user_dto_1 = require("../user/dto/get-many-user.dto");
const update_many_accommodation_1 = require("./dto/update-many-accommodation");
let AccommodationController = class AccommodationController {
    constructor(accommodationService) {
        this.accommodationService = accommodationService;
    }
    async getAll(req) {
        return await this.accommodationService.getList(req.query);
    }
    async getById(id) {
        const accommodation = await this.accommodationService.getOne(id);
        if (accommodation) {
            return accommodation;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    getMany(body) {
        const { ids } = body;
        const result = this.accommodationService.getMany(ids);
        if (result) {
            return result;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, body) {
        const updatedAccommodation = await this.accommodationService.update(id, body);
        if (updatedAccommodation) {
            return updatedAccommodation;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    updateMany(body) {
        const updatedAccommodation = this.accommodationService.updateMany(body.updateData);
        if (updatedAccommodation) {
            return updatedAccommodation;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async create(body) {
        const accommodation = await this.accommodationService.create(body);
        if (accommodation) {
            return accommodation;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteUser(id) {
        return await this.accommodationService.delete(id);
    }
    async deleteMany(body) {
        const { ids } = body;
        return await this.accommodationService.deleteMany(ids);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_2.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccommodationController.prototype, "getAll", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AccommodationController.prototype, "getById", null);
__decorate([
    common_1.Post('getMany'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_many_user_dto_1.GetManyDto]),
    __metadata("design:returntype", void 0)
], AccommodationController.prototype, "getMany", null);
__decorate([
    common_1.Patch('/:id'),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, accommodation_dto_1.AccommodationDto]),
    __metadata("design:returntype", Promise)
], AccommodationController.prototype, "update", null);
__decorate([
    common_1.Post('updateMany'),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_many_accommodation_1.UpdateManyAccommodationDto]),
    __metadata("design:returntype", void 0)
], AccommodationController.prototype, "updateMany", null);
__decorate([
    common_1.Post(),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [accommodation_dto_1.AccommodationDto]),
    __metadata("design:returntype", Promise)
], AccommodationController.prototype, "create", null);
__decorate([
    common_1.Delete('/:id'),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AccommodationController.prototype, "deleteUser", null);
__decorate([
    common_1.Post('deleteMany'),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_many_user_dto_1.GetManyDto]),
    __metadata("design:returntype", Promise)
], AccommodationController.prototype, "deleteMany", null);
AccommodationController = __decorate([
    swagger_1.ApiTags('Accommodation'),
    swagger_1.ApiBearerAuth(),
    common_1.Controller('accommodation'),
    __metadata("design:paramtypes", [accommodation_service_1.AccommodationService])
], AccommodationController);
exports.AccommodationController = AccommodationController;
//# sourceMappingURL=accommodation.controller.js.map