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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
const roles_enum_1 = require("../user/entity/enum/roles.enum");
const roles_decorator_1 = require("../user/roles.decorator");
const get_many_user_dto_1 = require("../user/dto/get-many-user.dto");
const payment_service_1 = require("./payment.service");
const payment_dto_1 = require("./dto/payment.dto");
const update_many_payment_1 = require("./dto/update-many-payment");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async getAll(req) {
        return await this.paymentService.getList(req.query);
    }
    async getById(id) {
        const payment = await this.paymentService.getOne(id);
        if (payment) {
            return payment;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    getMany(body) {
        const { ids } = body;
        const result = this.paymentService.getMany(ids);
        if (result) {
            return result;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, body) {
        const updatedPayment = await this.paymentService.update(id, body);
        if (updatedPayment) {
            return updatedPayment;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    updateMany(body) {
        const updatedPayment = this.paymentService.updateMany(body.updateData);
        if (updatedPayment) {
            return updatedPayment;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async create(body) {
        const Payment = await this.paymentService.create(body);
        if (Payment) {
            return Payment;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteUser(id) {
        return await this.paymentService.delete(id);
    }
    async deleteMany(body) {
        const { ids } = body;
        return await this.paymentService.deleteMany(ids);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_2.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getAll", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getById", null);
__decorate([
    common_1.Post('getMany'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_many_user_dto_1.GetManyDto]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "getMany", null);
__decorate([
    common_1.Patch('/:id'),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, payment_dto_1.PaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "update", null);
__decorate([
    common_1.Post('updateMany'),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_many_payment_1.UpdateManyPaymentDto]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "updateMany", null);
__decorate([
    common_1.Post(),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.PaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "create", null);
__decorate([
    common_1.Delete('/:id'),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "deleteUser", null);
__decorate([
    common_1.Post('deleteMany'),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_many_user_dto_1.GetManyDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "deleteMany", null);
PaymentController = __decorate([
    swagger_1.ApiTags('Payment'),
    swagger_1.ApiBearerAuth(),
    common_1.Controller('payment'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.controller.js.map