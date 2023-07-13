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
exports.ReservationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
const reservation_dto_1 = require("./dto/reservation.dto");
const update_reservation_dto_1 = require("./dto/update-reservation.dto");
const roles_enum_1 = require("../user/entity/enum/roles.enum");
const roles_decorator_1 = require("../user/roles.decorator");
const reservation_service_1 = require("./reservation.service");
const get_current_user_decorator_1 = require("../auth/decorator/get-current-user.decorator");
const get_many_user_dto_1 = require("../user/dto/get-many-user.dto");
const update_many_reservation_dto_1 = require("./dto/update-many-reservation.dto");
const public_decorator_1 = require("../auth/decorator/public.decorator");
let ReservationController = class ReservationController {
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    async getAll(req) {
        return await this.reservationService.getList(req.query);
    }
    async getById(id) {
        const reservation = await this.reservationService.getOne(id);
        if (reservation) {
            return reservation;
        }
        else {
            throw new common_1.HttpException("Bad request", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getApiData(req) {
        return await this.reservationService.getApiData();
    }
    getMany(body) {
        const { ids } = body;
        const result = this.reservationService.getMany(ids);
        if (result) {
            return result;
        }
        else {
            throw new common_1.HttpException("Bad request", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, body, res) {
        if (body.dateFrom > body.dateTo)
            throw new common_1.HttpException("Invalid date input", common_1.HttpStatus.BAD_REQUEST);
        const updatedReservation = await this.reservationService.update(id, body);
        if (updatedReservation) {
            res.send(updatedReservation);
            const text = `<div>
  <h2>Updated Reservation:</h2>
  <p><strong>ID:</strong> ${updatedReservation.data.id}</p>
  <p><strong>Name:</strong> ${updatedReservation.data.name}</p>
  <p><strong>From:</strong> ${updatedReservation.data.dateFrom.toISOString().split("T")[0]}</p>
  <p><strong>To:</strong> ${updatedReservation.data.dateTo.toISOString().split("T")[0]}</p>
  <p><strong>Number of People:</strong> ${updatedReservation.data.personNumber}</p>
  <p><strong>Accommodation:</strong> ${updatedReservation.data["accommodationName"]}</p>
  <p><strong>Programs:</strong> ${updatedReservation.data["programData"]}</p>
</div>`;
            await this.reservationService.newReservationEmail(text);
        }
        else {
            throw new common_1.HttpException("Bad request", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    updateMany(body) {
        const updatedReservation = this.reservationService.updateMany(body.updateData);
        if (updatedReservation) {
            return updatedReservation;
        }
        else {
            throw new common_1.HttpException("Bad request", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async create(body, res) {
        if (body.dateFrom > body.dateTo)
            throw new common_1.HttpException("Invalid date input", common_1.HttpStatus.BAD_REQUEST);
        const reservation = await this.reservationService.create(body);
        const result = await this.reservationService.getOne(reservation.id);
        res.send(result);
        if (result) {
            const text = `<div>
  <h2>New Reservation:</h2>
  <p><strong>ID:</strong> ${result.data.id}</p>
  <p><strong>Name:</strong> ${result.data.name}</p>
  <p><strong>From:</strong> ${result.data.dateFrom.toISOString().split("T")[0]}</p>
  <p><strong>To:</strong> ${result.data.dateTo.toISOString().split("T")[0]}</p>
  <p><strong>Number of People:</strong> ${result.data.personNumber}</p>
  <p><strong>Accommodation:</strong> ${result.data["accommodationName"]}</p>
  <p><strong>Programs:</strong> ${result.data["programData"]}</p>
  </div>`;
            await this.reservationService.newReservationEmail(text);
        }
    }
    async deleteUser(id) {
        return await this.reservationService.delete(id);
    }
    async deleteMany(body) {
        const { ids } = body;
        return await this.reservationService.deleteMany(ids);
    }
    async getReservationByRole(user) {
        try {
            const role = user.role;
            if (role) {
                const data = await this.reservationService.findReservationByRole(role);
                if (data.data.length) {
                    return data;
                }
                else
                    return;
            }
        }
        catch (error) {
            return new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getReportByCountry(query) {
        const report = await this.reservationService.getReportByCountry(query);
        if (report) {
            return report;
        }
        else {
            throw new common_1.HttpException("Bad request", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getReportByMealCount(body) {
        const report = await this.reservationService.getReportByMealCount(body.date);
        if (report) {
            return report;
        }
        else {
            throw new common_1.HttpException("Bad request", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getReportByProgramCount(body) {
        const report = await this.reservationService.getReportByProgramCount(body.date);
        if (report) {
            return report;
        }
        else {
            throw new common_1.HttpException("Bad request", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getReportByCash(query) {
        const report = await this.reservationService.getReportByPayment(query);
        if (report) {
            return report;
        }
        else {
            throw new common_1.HttpException("Bad request", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getReportByDate(query) {
        const report = await this.reservationService.getReportByContact(query);
        if (report) {
            return report;
        }
        else {
            throw new common_1.HttpException("Bad request", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getDailyReport(query) {
        const report = await this.reservationService.getDailyReport(query);
        if (report) {
            return report;
        }
        else {
            throw new common_1.HttpException("Bad request", common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_2.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getById", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)("app/data"),
    __param(0, (0, common_2.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getApiData", null);
__decorate([
    (0, common_1.Post)("getMany"),
    (0, roles_decorator_1.Roles)(roles_enum_1.UserRoles.ADMIN, roles_enum_1.UserRoles.RECEPTIONIST),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_many_user_dto_1.GetManyDto]),
    __metadata("design:returntype", void 0)
], ReservationController.prototype, "getMany", null);
__decorate([
    (0, common_1.Patch)("/:id"),
    (0, roles_decorator_1.Roles)(roles_enum_1.UserRoles.ADMIN, roles_enum_1.UserRoles.RECEPTIONIST),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_reservation_dto_1.UpdateReservationDto, Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "update", null);
__decorate([
    (0, common_1.Post)("updateMany"),
    (0, roles_decorator_1.Roles)(roles_enum_1.UserRoles.ADMIN, roles_enum_1.UserRoles.RECEPTIONIST),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_many_reservation_dto_1.UpdateManyReservationDto]),
    __metadata("design:returntype", void 0)
], ReservationController.prototype, "updateMany", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.UserRoles.ADMIN, roles_enum_1.UserRoles.RECEPTIONIST),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reservation_dto_1.ReservationDto, Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    (0, roles_decorator_1.Roles)(roles_enum_1.UserRoles.ADMIN, roles_enum_1.UserRoles.RECEPTIONIST),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Post)("deleteMany"),
    (0, roles_decorator_1.Roles)(roles_enum_1.UserRoles.ADMIN, roles_enum_1.UserRoles.RECEPTIONIST),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_many_user_dto_1.GetManyDto]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "deleteMany", null);
__decorate([
    (0, common_1.Get)("get/notification"),
    __param(0, (0, get_current_user_decorator_1.GetCurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getReservationByRole", null);
__decorate([
    (0, common_1.Get)("report/country"),
    (0, roles_decorator_1.Roles)(roles_enum_1.UserRoles.ADMIN, roles_enum_1.UserRoles.RECEPTIONIST),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getReportByCountry", null);
__decorate([
    (0, common_1.Post)("report/meals"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getReportByMealCount", null);
__decorate([
    (0, common_1.Post)("report/programs"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getReportByProgramCount", null);
__decorate([
    (0, common_1.Get)("report/payment"),
    (0, roles_decorator_1.Roles)(roles_enum_1.UserRoles.ADMIN),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getReportByCash", null);
__decorate([
    (0, common_1.Get)("report/contact"),
    (0, roles_decorator_1.Roles)(roles_enum_1.UserRoles.ADMIN, roles_enum_1.UserRoles.RECEPTIONIST),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getReportByDate", null);
__decorate([
    (0, common_1.Get)("report/daily"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "getDailyReport", null);
ReservationController = __decorate([
    (0, swagger_1.ApiTags)("Reservation"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)("reservation"),
    __metadata("design:paramtypes", [reservation_service_1.ReservationService])
], ReservationController);
exports.ReservationController = ReservationController;
//# sourceMappingURL=reservation.controller.js.map