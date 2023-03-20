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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const roles_enum_1 = require("./entity/enum/roles.enum");
let UserService = class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async getList(query) {
        const take = query._perPage || 10;
        const page = query._page || 1;
        const skip = (page - 1) * take;
        const keyword = query._q || '';
        let result = await this.userRepo.findAndCount({
            order: { id: query._sortOrder },
            where: { name: (0, typeorm_2.Like)('%' + keyword + '%') },
            skip: skip,
            take: take,
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                role: true,
            },
        });
        const users = result[0];
        const data = users.map((user) => {
            const roleObject = roles_enum_1.RolesObject[user.role];
            const { role } = user, rest = __rest(user, ["role"]);
            rest['role'] = roleObject;
            return rest;
        });
        return {
            data: data,
            total: result[1],
        };
    }
    async getMany(ids) {
        const result = await this.userRepo
            .createQueryBuilder('user')
            .where('user.id IN (:...ids)', { ids: ids })
            .getMany();
        if (result)
            return { data: result };
    }
    async getOne(id) {
        const user = await this.userRepo.findOne({
            where: { id: id },
            select: {
                id: true,
                name: true,
                username: true,
                role: true,
                email: true,
            },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const roleObject = roles_enum_1.RolesObject[user.role];
        const { role } = user, result = __rest(user, ["role"]);
        result['role'] = roleObject;
        return { data: result };
    }
    async findOne(id) {
        const result = await this.userRepo.findOneBy({ id });
        if (!result) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return result;
    }
    async findWithRole() {
        const result = await this.userRepo.find({
            select: {
                id: true,
                role: true,
                email: true,
            },
        });
        if (!result) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return result;
    }
    async findOneByUsername(username) {
        const user = await this.userRepo.findOne({
            where: { username },
            select: ['id', 'username', 'name', 'password', 'role', 'email'],
        });
        return user;
    }
    async create(body) {
        try {
            const { name, password, email, role } = body;
            const userRole = roles_enum_1.UserRolesObject[role.id].name;
            const username = body.username.toLocaleLowerCase();
            const alreadyUser = await this.userRepo.findOne({
                where: { username: username },
            });
            if (alreadyUser) {
                throw new common_1.HttpException('Username already exist.', common_1.HttpStatus.BAD_REQUEST);
            }
            const newUser = this.userRepo.create({
                username,
                name,
                password,
                role: userRole,
                email,
            });
            const dbNewUser = await this.userRepo.save(newUser);
            if (!dbNewUser) {
                throw new common_1.HttpException(`Bad request!Please enter valid username. `, common_1.HttpStatus.BAD_REQUEST);
            }
            const result = await this.getOne(newUser.id);
            return result;
        }
        catch (error) {
            throw new common_1.HttpException(`Bad request!${error.message} `, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, body) {
        const alreadyUser = await this.userRepo.findOneBy({ id });
        if (alreadyUser) {
            if (body.role) {
                body.role = roles_enum_1.UserRolesObject[body.role.id].name;
                console.log(body.role);
            }
            await this.userRepo.save(Object.assign(alreadyUser, body));
            const result = await this.getOne(id);
            return result;
        }
    }
    async updateMany(body) {
        let result = [];
        for (let i = 0; i < body.length; i++) {
            const alreadyUser = await this.userRepo.findOneBy({ id: body[i].id });
            if (alreadyUser) {
                const user = await this.userRepo.save(Object.assign(alreadyUser, body[i]));
                result.push(await this.getOne(body[i].id));
            }
        }
        return { data: [result] };
    }
    async delete(id) {
        const result = await this.userRepo.delete(id);
        return { data: [result.affected] };
    }
    async deleteMany(ids) {
        const result = await this.userRepo
            .createQueryBuilder()
            .delete()
            .from(user_entity_1.User)
            .where('id IN (:...ids)', { ids: ids })
            .execute();
        if (result)
            return { data: [result.affected] };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map