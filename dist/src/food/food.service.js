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
exports.FoodService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const food_entity_1 = require("./entity/food.entity");
let FoodService = class FoodService {
    constructor(foodRepo) {
        this.foodRepo = foodRepo;
    }
    async getList(query) {
        const take = query._perPage || 10;
        const page = query._page || 1;
        const skip = (page - 1) * take;
        const keyword = query._q || '';
        let result = await this.foodRepo.findAndCount({
            order: { id: query._sortOrder },
            where: { name: typeorm_2.Like('%' + keyword + '%') },
            skip: skip,
            take: take,
            select: {
                id: true,
                name: true,
            },
        });
        return {
            data: result[0],
            total: result[1],
        };
    }
    async getMany(ids) {
        const result = await this.foodRepo
            .createQueryBuilder('food')
            .where('food.id IN (:...ids)', { ids: ids })
            .getMany();
        if (result)
            return { data: result };
    }
    async getOne(id) {
        const result = await this.foodRepo.findOne({
            where: { id: id },
            select: {
                id: true,
                name: true,
            },
        });
        if (!result) {
            throw new common_1.HttpException('Food not found', common_1.HttpStatus.NOT_FOUND);
        }
        return { data: result };
    }
    async findAll() {
        const foods = await this.foodRepo.find();
        return foods;
    }
    async findOne(id) {
        const food = await this.foodRepo.findOneBy({ id });
        if (!food) {
            throw new common_1.HttpException('Food not found', common_1.HttpStatus.NOT_FOUND);
        }
        return food;
    }
    async findOneByName(name) {
        const food = await this.foodRepo.findOne({ where: { name: name } });
        return food;
    }
    async create(body) {
        try {
            const newFood = this.foodRepo.create(Object.assign({}, body));
            const food = await this.foodRepo.save(newFood);
            const result = await this.getOne(newFood.id);
            return result;
        }
        catch (error) {
            throw new common_1.HttpException(`Bad request!${error.message} `, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, body) {
        const alreadyFood = await this.foodRepo.findOneBy({ id });
        if (alreadyFood) {
            await this.foodRepo.save(Object.assign(alreadyFood, body));
            return await this.getOne(id);
        }
    }
    async updateMany(body) {
        let result = [];
        for (let i = 0; i < body.length; i++) {
            const alreadyFood = await this.foodRepo.findOneBy({
                id: body[i].id,
            });
            if (alreadyFood) {
                await this.foodRepo.save(Object.assign(alreadyFood, body[i]));
                result.push(await this.getOne(body[i].id));
            }
        }
        return { data: result };
    }
    async delete(id) {
        const result = await this.foodRepo.delete(id);
        return { data: [result.affected] };
    }
    async deleteMany(ids) {
        const result = await this.foodRepo
            .createQueryBuilder()
            .delete()
            .from(food_entity_1.Food)
            .where('id IN (:...ids)', { ids: ids })
            .execute();
        if (result)
            return { data: [result.affected] };
    }
};
FoodService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(food_entity_1.Food)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FoodService);
exports.FoodService = FoodService;
//# sourceMappingURL=food.service.js.map