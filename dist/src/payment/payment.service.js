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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("./entity/payment.entity");
let PaymentService = class PaymentService {
    constructor(paymentRepo) {
        this.paymentRepo = paymentRepo;
    }
    async getList(query) {
        const take = query._perPage || 10;
        const page = query._page || 1;
        const skip = (page - 1) * take;
        const keyword = query._q || '';
        let result = await this.paymentRepo.findAndCount({
            order: { id: query._sortOrder },
            where: { type: typeorm_2.Like('%' + keyword + '%') },
            skip: skip,
            take: take,
            select: {
                id: true,
                type: true,
            },
        });
        return {
            data: result[0],
            total: result[1],
        };
    }
    async getMany(ids) {
        const result = await this.paymentRepo
            .createQueryBuilder('Payment')
            .where('accommodation.id IN (:...ids)', { ids: ids })
            .getMany();
        if (result)
            return { data: result };
    }
    async getOne(id) {
        const result = await this.paymentRepo.findOne({
            where: { id: id },
            select: {
                id: true,
                type: true,
            },
        });
        if (!result) {
            throw new common_1.HttpException('Payment not found', common_1.HttpStatus.NOT_FOUND);
        }
        return { data: result };
    }
    async findAll() {
        const payment = await this.paymentRepo.find();
        return payment;
    }
    async findOne(id) {
        const payment = await this.paymentRepo.findOneBy({ id });
        if (!payment) {
            throw new common_1.HttpException('Payment not found', common_1.HttpStatus.NOT_FOUND);
        }
        return payment;
    }
    async findOneByType(type) {
        const Payment = await this.paymentRepo.findOne({
            where: { type },
        });
        return Payment;
    }
    async create(body) {
        try {
            const { type } = body;
            const newPayment = this.paymentRepo.create({
                type,
            });
            const payment = await this.paymentRepo.save(newPayment);
            const result = await this.getOne(payment.id);
            return result;
        }
        catch (error) {
            throw new common_1.HttpException(`Bad request!${error.message} `, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, body) {
        const alreadyPayment = await this.paymentRepo.findOneBy({ id });
        if (alreadyPayment) {
            await this.paymentRepo.save(Object.assign(alreadyPayment, body));
            return await this.getOne(id);
        }
    }
    async updateMany(body) {
        let result = [];
        for (let i = 0; i < body.length; i++) {
            const alreadyPayment = await this.paymentRepo.findOneBy({
                id: body[i].id,
            });
            if (alreadyPayment) {
                await this.paymentRepo.save(Object.assign(alreadyPayment, body[i]));
                result.push(await this.getOne(body[i].id));
            }
        }
        return { data: result };
    }
    async delete(id) {
        const result = await this.paymentRepo.delete(id);
        return { data: [result.affected] };
    }
    async deleteMany(ids) {
        const result = await this.paymentRepo
            .createQueryBuilder()
            .delete()
            .from(payment_entity_1.Payment)
            .where('id IN (:...ids)', { ids: ids })
            .execute();
        if (result)
            return { data: [result.affected] };
    }
};
PaymentService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map