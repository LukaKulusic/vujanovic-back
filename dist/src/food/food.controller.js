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
exports.FoodController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
const food_dto_1 = require("./dto/food.dto");
const roles_enum_1 = require("../user/entity/enum/roles.enum");
const roles_decorator_1 = require("../user/roles.decorator");
const food_service_1 = require("./food.service");
const get_many_user_dto_1 = require("../user/dto/get-many-user.dto");
const update_many_food_dto_1 = require("./dto/update-many-food.dto");
let FoodController = class FoodController {
    constructor(foodService) {
        this.foodService = foodService;
    }
    async getList(req) {
        return await this.foodService.getList(req.query);
    }
    getById(id) {
        const food = this.foodService.getOne(id);
        if (food) {
            return food;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    getMany(body) {
        const { ids } = body;
        const result = this.foodService.getMany(ids);
        if (result) {
            return result;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    update(id, body) {
        const updatedFood = this.foodService.update(id, body);
        if (updatedFood) {
            return updatedFood;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    updateMany(body) {
        const updatedFood = this.foodService.updateMany(body.updateData);
        if (updatedFood) {
            return updatedFood;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async create(body) {
        const food = this.foodService.create(body);
        if (food) {
            return food;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    deleteUser(id) {
        return this.foodService.delete(id);
    }
    async deleteMany(body) {
        const { ids } = body;
        return await this.foodService.deleteMany(ids);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_2.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "getList", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FoodController.prototype, "getById", null);
__decorate([
    common_1.Post('getMany'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_many_user_dto_1.GetManyDto]),
    __metadata("design:returntype", void 0)
], FoodController.prototype, "getMany", null);
__decorate([
    common_1.Patch('/:id'),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, food_dto_1.FoodDto]),
    __metadata("design:returntype", void 0)
], FoodController.prototype, "update", null);
__decorate([
    common_1.Post('updateMany'),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_many_food_dto_1.UpdateManyFoodDto]),
    __metadata("design:returntype", void 0)
], FoodController.prototype, "updateMany", null);
__decorate([
    common_1.Post(),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [food_dto_1.FoodDto]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "create", null);
__decorate([
    common_1.Delete('/:id'),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FoodController.prototype, "deleteUser", null);
__decorate([
    common_1.Post('deleteMany'),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_many_user_dto_1.GetManyDto]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "deleteMany", null);
FoodController = __decorate([
    swagger_1.ApiTags('Food'),
    swagger_1.ApiBearerAuth(),
    common_1.Controller('food'),
    __metadata("design:paramtypes", [food_service_1.FoodService])
], FoodController);
exports.FoodController = FoodController;
//# sourceMappingURL=food.controller.js.map