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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const program_entity_1 = require("./entity/program.entity");
const program_enum_1 = require("./entity/enum/program.enum");
let ProgramService = class ProgramService {
    constructor(programRepo) {
        this.programRepo = programRepo;
    }
    async getList(query) {
        const take = query._perPage || 10;
        const page = query._page || 1;
        const skip = (page - 1) * take;
        const keyword = query._q || "";
        let result = await this.programRepo.findAndCount({
            order: { id: query._sortOrder },
            where: { title: typeorm_2.Like("%" + keyword + "%") },
            skip: skip,
            take: take,
            select: {
                id: true,
                title: true,
                description: true,
                type: true,
            },
        });
        const programs = result[0];
        const data = programs.map((program) => {
            const typeObject = program_enum_1.TypesObject[program.type];
            const { type } = program, rest = __rest(program, ["type"]);
            rest["type"] = typeObject;
            return rest;
        });
        return {
            data: data,
            total: result[1],
        };
    }
    async getMany(ids) {
        const result = await this.programRepo
            .createQueryBuilder("program")
            .where("program.id IN (:...ids)", { ids: ids })
            .getMany();
        if (result)
            return { data: result };
    }
    async getOne(id) {
        const program = await this.programRepo.findOne({
            where: { id: id },
            select: {
                id: true,
                title: true,
                description: true,
                type: true,
            },
        });
        if (!program) {
            throw new common_1.HttpException("Program not found", common_1.HttpStatus.NOT_FOUND);
        }
        const typeObject = program_enum_1.TypesObject[program.type];
        const { type } = program, result = __rest(program, ["type"]);
        result["type"] = typeObject;
        return { data: result };
    }
    async findAll() {
        const programs = await this.programRepo.find();
        return programs;
    }
    async findOne(id) {
        const program = await this.programRepo.findOneBy({ id });
        if (!program) {
            throw new common_1.HttpException("Program not found", common_1.HttpStatus.NOT_FOUND);
        }
        return program;
    }
    async findOneByName(title) {
        const program = await this.programRepo.findOne({ where: { title: title } });
        return program;
    }
    async findByIds(ids) {
        const programs = await this.programRepo
            .createQueryBuilder("program")
            .where("program.id IN (:...ids)", { ids: ids })
            .getMany();
        if (programs.length) {
            return programs;
        }
    }
    async create(body) {
        try {
            const { title, description, type } = body;
            const programType = program_enum_1.ProgramTypeObject[type.id].name;
            const newProgram = this.programRepo.create({
                title,
                description,
                type: programType,
            });
            await this.programRepo.save(newProgram);
            const result = await this.getOne(newProgram.id);
            return result;
        }
        catch (error) {
            throw new common_1.HttpException(`Bad request!${error.message} `, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, body) {
        const alreadyProgram = await this.programRepo.findOneBy({ id });
        if (alreadyProgram) {
            if (body.type) {
                body.type = program_enum_1.ProgramTypeObject[body.type.id].name;
            }
            await this.programRepo.save(Object.assign(alreadyProgram, body));
            return await this.getOne(id);
        }
    }
    async updateMany(body) {
        let result = [];
        for (let i = 0; i < body.length; i++) {
            const alreadyProgram = await this.programRepo.findOneBy({
                id: body[i].id,
            });
            if (alreadyProgram) {
                await this.programRepo.save(Object.assign(alreadyProgram, body[i]));
                result.push(await this.getOne(body[i].id));
            }
        }
        return { data: result };
    }
    async delete(id) {
        const result = await this.programRepo.delete(id);
        return { data: [result.affected] };
    }
    async deleteMany(ids) {
        const result = await this.programRepo
            .createQueryBuilder()
            .delete()
            .from(program_entity_1.Program)
            .where("id IN (:...ids)", { ids: ids })
            .execute();
        if (result)
            return { data: [result.affected] };
    }
    async getProgramIdsByReservationId(id) {
        const program = await this.programRepo
            .createQueryBuilder("program")
            .select(["program.id", "program.type"])
            .innerJoin("program.programsToReservation", "programsToReservation")
            .leftJoin("programsToReservation.reservation", "reservation")
            .where("reservation.id = :id", { id })
            .getMany();
        return program;
    }
};
ProgramService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(program_entity_1.Program)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProgramService);
exports.ProgramService = ProgramService;
//# sourceMappingURL=program.service.js.map