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
exports.ProgramController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("@nestjs/common");
const program_dto_1 = require("./dto/program.dto");
const update_program_dto_1 = require("./dto/update-program.dto");
const roles_enum_1 = require("../user/entity/enum/roles.enum");
const roles_decorator_1 = require("../user/roles.decorator");
const program_service_1 = require("./program.service");
const get_many_user_dto_1 = require("../user/dto/get-many-user.dto");
const update_many_program_dto_1 = require("./dto/update-many-program.dto");
let ProgramController = class ProgramController {
    constructor(programService) {
        this.programService = programService;
    }
    async getList(req) {
        return await this.programService.getList(req.query);
    }
    async getById(id) {
        const program = await this.programService.getOne(id);
        if (program) {
            return program;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    getMany(body) {
        const { ids } = body;
        const result = this.programService.getMany(ids);
        if (result) {
            return result;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, body) {
        const updatedProgram = await this.programService.update(id, body);
        if (updatedProgram) {
            return updatedProgram;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    updateMany(body) {
        const updatedPrograms = this.programService.updateMany(body.updateData);
        if (updatedPrograms) {
            return updatedPrograms;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async create(body) {
        const program = await this.programService.create(body);
        if (program) {
            return program;
        }
        else {
            throw new common_1.HttpException('Bad request', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteUser(id) {
        return await this.programService.delete(id);
    }
    async deleteMany(body) {
        const { ids } = body;
        return await this.programService.deleteMany(ids);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_2.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramController.prototype, "getList", null);
__decorate([
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProgramController.prototype, "getById", null);
__decorate([
    common_1.Post('getMany'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_many_user_dto_1.GetManyDto]),
    __metadata("design:returntype", void 0)
], ProgramController.prototype, "getMany", null);
__decorate([
    common_1.Patch('/:id'),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_program_dto_1.UpdateProgramDto]),
    __metadata("design:returntype", Promise)
], ProgramController.prototype, "update", null);
__decorate([
    common_1.Post('updateMany'),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_many_program_dto_1.UpdateManyProgramDto]),
    __metadata("design:returntype", void 0)
], ProgramController.prototype, "updateMany", null);
__decorate([
    common_1.Post(),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [program_dto_1.ProgramDto]),
    __metadata("design:returntype", Promise)
], ProgramController.prototype, "create", null);
__decorate([
    common_1.Delete('/:id'),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProgramController.prototype, "deleteUser", null);
__decorate([
    common_1.Post('deleteMany'),
    roles_decorator_1.Roles(roles_enum_1.UserRoles.ADMIN),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_many_user_dto_1.GetManyDto]),
    __metadata("design:returntype", Promise)
], ProgramController.prototype, "deleteMany", null);
ProgramController = __decorate([
    swagger_1.ApiTags('Program'),
    swagger_1.ApiBearerAuth(),
    common_1.Controller('program'),
    __metadata("design:paramtypes", [program_service_1.ProgramService])
], ProgramController);
exports.ProgramController = ProgramController;
//# sourceMappingURL=program.controller.js.map