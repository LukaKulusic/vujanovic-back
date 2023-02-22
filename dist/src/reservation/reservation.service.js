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
exports.ReservationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reservation_entity_1 = require("./entity/reservation.entity");
const roles_enum_1 = require("../user/entity/enum/roles.enum");
const country_service_1 = require("../country/country.service");
const food_service_1 = require("../food/food.service");
const accommodation_service_1 = require("../accommodation/accommodation.service");
const payment_service_1 = require("../payment/payment.service");
const program_service_1 = require("../program/program.service");
const reservation_program_service_1 = require("../reservation-program/reservation-program.service");
const program_enum_1 = require("../program/entity/enum/program.enum");
const mail_service_1 = require("../mail/mail.service");
const schedule_1 = require("@nestjs/schedule");
const user_service_1 = require("../user/user.service");
let ReservationService = class ReservationService {
    constructor(reservationRepo, countryService, foodService, accommodationService, paymentService, reservationProgramService, programService, userService, mailService, dataSource) {
        this.reservationRepo = reservationRepo;
        this.countryService = countryService;
        this.foodService = foodService;
        this.accommodationService = accommodationService;
        this.paymentService = paymentService;
        this.reservationProgramService = reservationProgramService;
        this.programService = programService;
        this.userService = userService;
        this.mailService = mailService;
        this.dataSource = dataSource;
    }
    async getList(query) {
        const take = query._perPage || 10;
        const page = query._page || 1;
        const skip = (page - 1) * take;
        const keyword = query._q || "";
        const result = await this.reservationRepo
            .createQueryBuilder("reservation")
            .select([
            "reservation.id",
            "reservation.name",
            "reservation.personNumber",
            "reservation.veganNumber",
            "reservation.dateFrom",
            "reservation.dateTo",
        ])
            .addSelect(["food.id", "food.name"])
            .addSelect(["accommodation.id", "accommodation.name"])
            .addSelect(["payment.id", "payment.type"])
            .addSelect(["country.id", "country.name"])
            .addSelect(["programsToReservation"])
            .addSelect(["program.id", "program.title", "program.type"])
            .innerJoin("reservation.food", "food")
            .innerJoin("reservation.accommodation", "accommodation")
            .innerJoin("reservation.payment", "payment")
            .innerJoin("reservation.country", "country")
            .innerJoin("reservation.programsToReservation", "programsToReservation")
            .innerJoin("programsToReservation.program", "program")
            .where("reservation.name like :name", { name: `%${keyword}%` })
            .orderBy("reservation.id", query._sortOrder)
            .take(take)
            .skip(skip)
            .getManyAndCount();
        const reservations = result[0];
        const data = reservations.map((reservation) => {
            const programs = reservation.programsToReservation.map((element) => {
                element.program["name"] = element.program.title;
                delete element.program.title;
                return element.program;
            });
            reservation["programs"] = programs;
            delete reservation.programsToReservation;
            return reservation;
        });
        return {
            data: data,
            total: result[1],
        };
    }
    async getMany(ids) {
        const result = await this.reservationRepo
            .createQueryBuilder("reservation")
            .where("reservation.id IN (:...ids)", { ids: ids })
            .getMany();
        if (result)
            return { data: result };
    }
    async getApiData() {
        const food = await this.dataSource.query(`select id,name from food `);
        const accommodation = await this.dataSource.query(`select id,name from accommodation `);
        const program = await this.dataSource.query(`select id,title as name from program `);
        const country = await this.dataSource.query(`select id,name from country `);
        const payment = await this.dataSource.query(`select id,type as name from payment `);
        return {
            food,
            accommodation,
            program,
            country,
            payment,
            roles: Object.values(roles_enum_1.UserRolesObject),
            programTypes: Object.values(program_enum_1.ProgramTypeObject),
        };
    }
    async findAll() {
        const reservations = await this.reservationRepo.find({
            relations: [
                "food",
                "accommodation",
                "payment",
                "country",
                "programsToReservation",
                "programsToReservation.program",
            ],
        });
        return reservations;
    }
    async findOne(id) {
        const reservation = await this.reservationRepo.findOne({
            where: { id },
            relations: [
                "food",
                "accommodation",
                "payment",
                "country",
                "programsToReservation",
                "programsToReservation.program",
            ],
        });
        if (!reservation) {
            throw new common_1.HttpException("Reservation not found", common_1.HttpStatus.NOT_FOUND);
        }
        return reservation;
    }
    async getOne(id) {
        const result = await this.reservationRepo
            .createQueryBuilder("reservation")
            .select([
            "reservation.id",
            "reservation.name",
            "reservation.personNumber",
            "reservation.veganNumber",
            "reservation.dateFrom",
            "reservation.dateTo",
        ])
            .addSelect(["food.id", "food.name"])
            .addSelect(["accommodation.id", "accommodation.name"])
            .addSelect(["payment.id", "payment.type"])
            .addSelect(["country.id", "country.name"])
            .addSelect(["programsToReservation"])
            .addSelect(["program.id", "program.title", "program.type"])
            .innerJoin("reservation.food", "food")
            .innerJoin("reservation.accommodation", "accommodation")
            .innerJoin("reservation.payment", "payment")
            .innerJoin("reservation.country", "country")
            .innerJoin("reservation.programsToReservation", "programsToReservation")
            .innerJoin("programsToReservation.program", "program")
            .where("reservation.id = :id", { id })
            .getOne();
        if (!result) {
            throw new common_1.HttpException("Reservation not found", common_1.HttpStatus.NOT_FOUND);
        }
        const programs = result.programsToReservation.map((element) => {
            return element.program.id;
        });
        const programTitles = result.programsToReservation.map((element) => {
            return element.program.title;
        });
        result["programs"] = programs;
        result["titles"] = programTitles;
        delete result.programsToReservation;
        return { data: result };
    }
    async findOneByName(name) {
        const reservation = await this.reservationRepo.findOne({
            where: { name: name },
        });
        return reservation;
    }
    async newReservationEmail(text) {
        const users = await this.userService.findWithRole();
        const filteredUsers = users.filter((e) => {
            return e.role === roles_enum_1.UserRoles.ADMIN || e.role === roles_enum_1.UserRoles.RECEPTIONIST;
        });
        for (const user of filteredUsers) {
            await this.mailService.sendEmail(user.email, text);
        }
    }
    async create(body) {
        try {
            let country;
            if (body.country) {
                country = await this.countryService.findOne(body.country.id);
            }
            const food = await this.foodService.findOne(body.food.id);
            const accommodation = await this.accommodationService.findOne(body.accommodation.id);
            const payment = await this.paymentService.findOne(body.payment.id);
            if (food && accommodation && payment) {
                const newReservation = this.reservationRepo.create(Object.assign(Object.assign({}, body), { country,
                    food,
                    accommodation,
                    payment }));
                const reservation = await this.reservationRepo.save(newReservation);
                const programs = await this.programService.findByIds(body.programs);
                if (reservation && programs) {
                    for (const program of programs) {
                        await this.reservationProgramService.create(reservation, program);
                    }
                    return reservation;
                }
            }
            else
                throw new common_1.HttpException(`Bad request! `, common_1.HttpStatus.BAD_REQUEST);
        }
        catch (error) {
            throw new common_1.HttpException(`Bad request!${error.message} `, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, body) {
        try {
            const alreadyReservation = await this.reservationRepo.findOneBy({ id });
            let reservation;
            if (alreadyReservation) {
                if (body.accommodation) {
                    const accommodation = await this.accommodationService.findOne(body.accommodation.id);
                    alreadyReservation.accommodation = accommodation;
                }
                if (body.food) {
                    const food = await this.foodService.findOne(body.food.id);
                    alreadyReservation.food = food;
                }
                if (body.country) {
                    const country = await this.countryService.findOne(body.country.id);
                    alreadyReservation.country = country;
                }
                if (body.payment) {
                    const payment = await this.paymentService.findOne(body.payment.id);
                    alreadyReservation.payment = payment;
                }
                reservation = await this.reservationRepo.save(Object.assign(alreadyReservation, body));
                if (body.programs) {
                    await this.reservationProgramService.deleteByReservationId(reservation.id);
                    const programs = await this.programService.findByIds(body.programs);
                    if (reservation && programs) {
                        for (const program of programs) {
                            await this.reservationProgramService.create(reservation, program);
                        }
                    }
                }
                return await this.getOne(id);
            }
        }
        catch (error) {
            throw new common_1.HttpException(`Bad request! ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateMany(body) {
        let result = [];
        for (let i = 0; i < body.length; i++) {
            const alreadyReservation = await this.reservationRepo.findOneBy({
                id: body[i].id,
            });
            if (alreadyReservation) {
                await this.reservationRepo.save(Object.assign(alreadyReservation, body[i]));
                result.push(await this.findOne(body[i].id));
            }
        }
        return { data: result };
    }
    async delete(id) {
        const result = await this.reservationRepo.delete(id);
        return { data: [result.affected] };
    }
    async deleteMany(ids) {
        const result = await this.reservationRepo
            .createQueryBuilder()
            .delete()
            .from(reservation_entity_1.Reservation)
            .where("id IN (:...ids)", { ids: ids })
            .execute();
        if (result)
            return { data: [result.affected] };
    }
    async findAllReservationWithFilters(query, take, skip) {
        const { fromDate, toDate, food, accommodation, program, country } = query;
        const filters = [];
        if (food)
            filters.push({ food: { id: typeorm_2.In([...food]) } });
        if (accommodation)
            filters.push({ accommodation: { id: typeorm_2.In([...accommodation]) } });
        if (country)
            filters.push({ country: { id: typeorm_2.In([...country]) } });
        if (program)
            filters.push({ programsToReservation: { id: typeorm_2.In([...program]) } });
        if (fromDate && toDate) {
            filters.push({ dateFrom: typeorm_2.MoreThanOrEqual(fromDate) });
            filters.push({ dateTo: typeorm_2.LessThanOrEqual(toDate) });
        }
        console.log(filters);
        const reservations = await this.reservationRepo.findAndCount({
            relations: [
                "food",
                "accommodation",
                "country",
                "programsToReservation",
                "programsToReservation.program",
            ],
            where: [...filters],
        });
        return reservations;
    }
    async findReservationByRole(role) {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        const dateString = date.toISOString().split("T")[0];
        const reservations = await this.reservationRepo
            .createQueryBuilder("reservation")
            .select([
            "reservation.id",
            "reservation.name",
            "reservation.personNumber",
            "reservation.veganNumber",
            "reservation.dateFrom",
            "reservation.dateTo",
        ])
            .addSelect(["food.id", "food.name"])
            .addSelect(["accommodation.id", "accommodation.name"])
            .addSelect(["payment.id", "payment.type"])
            .addSelect(["country.id", "country.name"])
            .addSelect(["programsToReservation"])
            .addSelect(["program.id", "program.title", "program.type"])
            .innerJoin("reservation.food", "food")
            .innerJoin("reservation.accommodation", "accommodation")
            .innerJoin("reservation.payment", "payment")
            .innerJoin("reservation.country", "country")
            .innerJoin("reservation.programsToReservation", "programsToReservation")
            .innerJoin("programsToReservation.program", "program")
            .where("reservation.dateFrom =:date", {
            date: dateString,
        })
            .orderBy("reservation.id", "ASC")
            .getManyAndCount();
        if (reservations[1] === 0)
            return { data: "" };
        if (role === roles_enum_1.UserRoles.ADMIN) {
            let text = "";
            for (const reservation of reservations[0]) {
                const programs = [];
                programs.push(reservation.programsToReservation.map((e) => {
                    return e.program.title;
                }));
                let data = `[id:${reservation.id}, ime:${reservation.name}, broj osoba:${reservation.personNumber}, smestaj:${reservation.accommodation.name}, od:${reservation.dateFrom.toISOString().split("T")[0]}, do:${reservation.dateTo.toISOString().split("T")[0]}], programi:[${programs}], tip obroka:${reservation.food.name}, tip placanja:${reservation.payment.type}],   `;
                text += data;
            }
            const textAdmin = ` Broj rezervacija:${reservations[1]}, datum: ${dateString} :${text} `;
            return {
                data: textAdmin,
            };
        }
        else if (role === roles_enum_1.UserRoles.RECEPTIONIST) {
            let text = "";
            for (const reservation of reservations[0]) {
                const programs = [];
                programs.push(reservation.programsToReservation.map((e) => {
                    return e.program.title;
                }));
                let data = `[id:${reservation.id}, ime:${reservation.name}, broj osoba:${reservation.personNumber}, smestaj:${reservation.accommodation.name}, od:${reservation.dateFrom.toISOString().split("T")[0]}, do:${reservation.dateTo.toISOString().split("T")[0]}], programi:[${programs}], tip obroka:${reservation.food.name}, tip placanja:${reservation.payment.type}
      ]   ,`;
                text += data;
            }
            const textReceptionist = ` Broj rezervacija:${reservations[1]}, datum: ${dateString} :${text} `;
            return {
                data: textReceptionist,
            };
        }
        if (role === roles_enum_1.UserRoles.TOUR_GUIDE) {
            let text = "";
            for (const reservation of reservations[0]) {
                const programs = [];
                programs.push(reservation.programsToReservation.map((e) => {
                    return e.program.title;
                }));
                let data = `[id:${reservation.id}, ime:${reservation.name}, broj osoba:${reservation.personNumber}, programi:[${programs}], od:${reservation.dateFrom.toISOString().split("T")[0]}, do:${reservation.dateTo.toISOString().split("T")[0]}], 
                                                 
          `;
                text += data;
            }
            const textTourGuide = ` Broj rezervacija:${reservations[1]}, datum: ${dateString} \n :${text} `;
            return {
                data: textTourGuide,
            };
        }
        else if (role === roles_enum_1.UserRoles.COOK) {
            let text = "";
            let total = 0;
            let totalVegan = 0;
            for (const reservation of reservations[0]) {
                let data = `[id:${reservation.id}, ime:${reservation.name}, broj osoba:${reservation.personNumber},broj vegana:${reservation.veganNumber}, tip obroka:${reservation.food.name}, od:${reservation.dateFrom.toISOString().split("T")[0]}, do:${reservation.dateTo.toISOString().split("T")[0]}], 
                                                 
          `;
                text += data;
                total += reservation.personNumber;
                totalVegan += reservation.veganNumber;
            }
            const textCook = ` Broj rezervacija:${reservations[1]}, datum: ${dateString},ukupno:${total}, vegana:${totalVegan} \n :${text} }`;
            return {
                data: textCook,
            };
        }
    }
    async getReportByCountry(query) {
        const take = query._perPage || 10;
        const page = query._page || 1;
        const skip = (page - 1) * take;
        const keyword = query._q || "";
        const sortOrder = query._sortOrder || "ASC";
        const dateFrom = query.dateFrom || "2020-1-1";
        const dateTo = query.dateTo || "2025-1-1";
        const program = query.program || [1, 2, 3];
        const report = await this.reservationRepo.query(`
 select count(country.name) as "totalReservation", country.name as id, SUM("personNumber") as total,SUM("veganNumber") as vegan from reservation
 inner join country on country.id = reservation."countryId" 
 inner join "reservation_program" on "reservation_program"."reservationId" = reservation.id
 inner join program on program.id = reservation_program."programId"
 where "reservation"."dateFrom" >= '${dateFrom}' and "reservation"."dateTo" <='${dateTo}'
 and "program"."id" in (${program})
 group by country.name
 order by country.name ${sortOrder}
 offset ${skip}
 limit ${take}
 `);
        const count = await this.reservationRepo.query(`
 select country.name as id from reservation
 inner join country on country.id = reservation."countryId" 
 inner join "reservation_program" on "reservation_program"."reservationId" = reservation.id
 inner join program on program.id = reservation_program."programId"
 where "reservation"."dateFrom" >= '${dateFrom}' and "reservation"."dateTo" <='${dateTo}'
 and "program"."id" in (${program})
 group by country.name
 
 `);
        const total = count.length;
        return { data: report, total };
    }
    async getReportByCash(query) {
        const take = query._perPage || 10;
        const page = query._page || 1;
        const skip = (page - 1) * take;
        const dateFrom = query.dateFrom || "2020-1-1";
        const dateTo = query.dateTo || "2024-1-1";
        const payment = query.payment || 1;
        const result = await this.reservationRepo
            .createQueryBuilder("reservation")
            .select([
            "reservation.id",
            "reservation.name",
            "reservation.personNumber",
            "reservation.veganNumber",
            "reservation.dateFrom",
            "reservation.dateTo",
        ])
            .innerJoin("reservation.payment", "payment")
            .where("payment.id =:id", { id: payment })
            .andWhere("reservation.dateFrom >= :start", { start: `${dateFrom}` })
            .andWhere("reservation.dateTo <= :end", { end: `${dateTo}` })
            .orderBy("reservation.id", query._sortOrder)
            .take(take)
            .skip(skip)
            .getManyAndCount();
        return {
            data: result[0],
            total: result[1],
        };
    }
    async cronJob() {
        const users = await this.userService.findWithRole();
        for (const user of users) {
            const text = await this.findReservationByRole(user.role);
            if (text.data.length) {
                await this.mailService.sendEmail(user.email, text.data);
            }
        }
        console.log("Cron is being executed!");
    }
};
__decorate([
    schedule_1.Cron("0 0 12 * * *"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReservationService.prototype, "cronJob", null);
ReservationService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(reservation_entity_1.Reservation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        country_service_1.CountryService,
        food_service_1.FoodService,
        accommodation_service_1.AccommodationService,
        payment_service_1.PaymentService,
        reservation_program_service_1.ReservationProgramService,
        program_service_1.ProgramService,
        user_service_1.UserService,
        mail_service_1.MailService,
        typeorm_2.DataSource])
], ReservationService);
exports.ReservationService = ReservationService;
//# sourceMappingURL=reservation.service.js.map