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
exports.AccommodationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const accommodation_entity_1 = require("./entity/accommodation.entity");
let AccommodationService = class AccommodationService {
    constructor(accommodationRepo) {
        this.accommodationRepo = accommodationRepo;
    }
    async getList(query) {
        const take = query._perPage || 10;
        const page = query._page || 1;
        const skip = (page - 1) * take;
        const keyword = query._q || '';
        let result = await this.accommodationRepo.findAndCount({
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
        const result = await this.accommodationRepo
            .createQueryBuilder('accommodation')
            .where('accommodation.id IN (:...ids)', { ids: ids })
            .getMany();
        if (result)
            return { data: result };
    }
    async getOne(id) {
        const result = await this.accommodationRepo.findOne({
            where: { id: id },
            select: {
                id: true,
                name: true,
            },
        });
        if (!result) {
            throw new common_1.HttpException('Accommodation not found', common_1.HttpStatus.NOT_FOUND);
        }
        return { data: result };
    }
    async findAll() {
        const accommodations = await this.accommodationRepo.find();
        return accommodations;
    }
    async findOne(id) {
        const accommodation = await this.accommodationRepo.findOneBy({ id });
        if (!accommodation) {
            throw new common_1.HttpException('Accommodation not found', common_1.HttpStatus.NOT_FOUND);
        }
        return accommodation;
    }
    async findOneByName(name) {
        const Accommodation = await this.accommodationRepo.findOne({
            where: { name: name },
        });
        return Accommodation;
    }
    async create(body) {
        try {
            const { name } = body;
            const newAccommodation = this.accommodationRepo.create({
                name,
            });
            const accommodation = await this.accommodationRepo.save(newAccommodation);
            const result = await this.getOne(accommodation.id);
            return result;
        }
        catch (error) {
            throw new common_1.HttpException(`Bad request!${error.message} `, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, body) {
        const alreadyAccommodation = await this.accommodationRepo.findOneBy({ id });
        if (alreadyAccommodation) {
            await this.accommodationRepo.save(Object.assign(alreadyAccommodation, body));
            return await this.getOne(id);
        }
    }
    async updateMany(body) {
        let result = [];
        for (let i = 0; i < body.length; i++) {
            const alreadyAccommodation = await this.accommodationRepo.findOneBy({
                id: body[i].id,
            });
            if (alreadyAccommodation) {
                await this.accommodationRepo.save(Object.assign(alreadyAccommodation, body[i]));
                result.push(await this.getOne(body[i].id));
            }
        }
        return { data: result };
    }
    async delete(id) {
        const result = await this.accommodationRepo.delete(id);
        return { data: [result.affected] };
    }
    async deleteMany(ids) {
        const result = await this.accommodationRepo
            .createQueryBuilder()
            .delete()
            .from(accommodation_entity_1.Accommodation)
            .where('id IN (:...ids)', { ids: ids })
            .execute();
        if (result)
            return { data: [result.affected] };
    }
};
AccommodationService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(accommodation_entity_1.Accommodation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AccommodationService);
exports.AccommodationService = AccommodationService;
//# sourceMappingURL=accommodation.service.js.map