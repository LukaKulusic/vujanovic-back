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
exports.ReservationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reservation_entity_1 = require("./entity/reservation.entity");
const roles_enum_1 = require("../user/entity/enum/roles.enum");
const country_service_1 = require("../country/country.service");
const accommodation_service_1 = require("../accommodation/accommodation.service");
const payment_service_1 = require("../payment/payment.service");
const program_enum_1 = require("../program/entity/enum/program.enum");
const mail_service_1 = require("../mail/mail.service");
const schedule_1 = require("@nestjs/schedule");
const user_service_1 = require("../user/user.service");
const reservation_accommodation_service_1 = require("../reservation-accommodation/reservation-accommodation.service");
const reservation_description_service_1 = require("../reservation-description/reservation-description.service");
let ReservationService = class ReservationService {
    constructor(reservationRepo, countryService, accommodationService, paymentService, userService, mailService, dataSource, reservationAccommodationService, reservationDescriptionService) {
        this.reservationRepo = reservationRepo;
        this.countryService = countryService;
        this.accommodationService = accommodationService;
        this.paymentService = paymentService;
        this.userService = userService;
        this.mailService = mailService;
        this.dataSource = dataSource;
        this.reservationAccommodationService = reservationAccommodationService;
        this.reservationDescriptionService = reservationDescriptionService;
        this.paginate = (items, page = 1, perPage = 10) => items.slice(perPage * (page - 1), perPage * page);
    }
    async getList(query) {
        const take = query._perPage || 50;
        const page = query._page || 1;
        const skip = (page - 1) * take;
        const keyword = query._q || "";
        const order = query._sortOrder || "DESC";
        let dateFrom = query.dateFrom;
        let dateTo = query.dateTo;
        if (!dateFrom)
            dateFrom = new Date().toISOString().split("T")[0];
        if (!dateTo) {
            const date = new Date(dateFrom);
            date.setDate(date.getDate() + 1);
            dateTo = date.toISOString().split("T")[0];
        }
        const result = await this.reservationRepo
            .createQueryBuilder("reservation")
            .select([
            "reservation.id",
            "reservation.name",
            "reservation.contact",
            "reservation.personNumber",
            "reservation.veganNumber",
            "reservation.vegetarianNumber",
            "reservation.paymentDetails",
            "reservation.dateFrom",
            "reservation.dateTo",
        ])
            .addSelect(["accommodationsToReservation"])
            .addSelect(["accommodation.id", "accommodation.name"])
            .addSelect(["payment.id", "payment.type"])
            .addSelect(["country.id", "country.name"])
            .addSelect(["description"])
            .addSelect(["programsToDescriptions"])
            .addSelect(["program.id", "program.title", "program.type"])
            .addSelect(["foodToDescriptions"])
            .addSelect(["food.id", "food.name"])
            .leftJoin("reservation.accommodationsToReservation", "accommodationsToReservation")
            .leftJoin("accommodationsToReservation.accommodation", "accommodation")
            .leftJoinAndSelect("reservation.payment", "payment")
            .leftJoin("reservation.country", "country")
            .leftJoin("reservation.descriptions", "description")
            .leftJoin("description.programsToDescriptions", "programsToDescriptions")
            .leftJoin("programsToDescriptions.program", "program")
            .leftJoin("description.foodToDescriptions", "foodToDescriptions")
            .leftJoin("foodToDescriptions.food", "food")
            .where(`reservation.dateFrom BETWEEN '${new Date(dateFrom).toISOString()}' AND '${new Date(dateTo).toISOString()}'`)
            .andWhere("reservation.name like :name", { name: `%${keyword}%` })
            .orderBy("reservation.dateFrom", order)
            .addOrderBy("reservation.id", order)
            .addOrderBy("accommodation.id", "ASC")
            .getManyAndCount();
        const reservations = result[0];
        const data = reservations.map((reservation) => {
            const data = reservation.descriptions.map((element) => {
                const data = new Object();
                data["date"] = element.date.toISOString().split("T")[0];
                data["programIds"] = element.programsToDescriptions.map((e) => {
                    return e.program.id;
                });
                data["foodIds"] = element.foodToDescriptions.map((e) => {
                    return e.food.id;
                });
                return data;
            });
            const accommodations = reservation.accommodationsToReservation.map((element) => {
                return element.accommodation;
            });
            reservation["accommodations"] = accommodations;
            reservation["description"] = data;
            delete reservation.descriptions;
            delete reservation.accommodationsToReservation;
            return reservation;
        });
        return {
            data: this.paginate(result[0], page, take),
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
        const result = await this.reservationRepo.findOne({
            where: { id: id },
            relations: {
                descriptions: {
                    foodToDescriptions: { food: true },
                    programsToDescriptions: { program: true },
                },
                payment: true,
                country: true,
                accommodationsToReservation: { accommodation: true },
            },
            order: {
                descriptions: {
                    date: "ASC",
                    programsToDescriptions: {
                        id: "ASC",
                    },
                    foodToDescriptions: {
                        id: "ASC",
                    },
                },
                accommodationsToReservation: {
                    id: "ASC",
                },
            },
        });
        if (!result) {
            throw new common_1.HttpException("Reservation not found", common_1.HttpStatus.NOT_FOUND);
        }
        const data = result.descriptions.map((e) => {
            const data = new Object();
            data["date"] = e.date.toISOString().split("T")[0];
            data["programIds"] = e.programsToDescriptions.map((e) => {
                return e.program.id;
            });
            data["foodIds"] = e.foodToDescriptions.map((e) => {
                return e.food.id;
            });
            return data;
        });
        const accommodations = result.accommodationsToReservation.map((element) => {
            return element.accommodation.id;
        });
        const accommodationNames = result.accommodationsToReservation.map((element) => {
            return element.accommodation.name;
        });
        result["undefined"] = data;
        result["description"] = data;
        delete result.descriptions;
        result["accommodations"] = accommodations;
        result["accommodationName"] = accommodationNames;
        delete result.accommodationsToReservation;
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
            const { country, payment, accommodations, description } = body, reservation = __rest(body, ["country", "payment", "accommodations", "description"]);
            const newReservation = this.reservationRepo.create(Object.assign({}, reservation));
            if (body.country.id > 0) {
                const country = await this.countryService.findOne(body.country.id);
                newReservation.country = country;
            }
            if (body.payment.id > 0) {
                const payment = await this.paymentService.findOne(body.payment.id);
                newReservation.payment = payment;
            }
            await this.reservationRepo.save(newReservation);
            if (body.description) {
                for (const desc of body.description) {
                    await this.reservationDescriptionService.create(desc, newReservation);
                }
            }
            if (body.accommodations) {
                const accommodations = await this.accommodationService.findByIds(body.accommodations);
                if (accommodations) {
                    for (const accommodation of accommodations) {
                        await this.reservationAccommodationService.create(newReservation, accommodation);
                    }
                }
            }
            return newReservation;
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
                const { country, payment, accommodations, description } = body, updateBody = __rest(body, ["country", "payment", "accommodations", "description"]);
                alreadyReservation.country = null;
                alreadyReservation.payment = null;
                alreadyReservation.accommodationsToReservation = null;
                if (body.country.id > 0) {
                    const country = await this.countryService.findOne(body.country.id);
                    alreadyReservation.country = country;
                }
                if (body.payment.id > 0) {
                    const payment = await this.paymentService.findOne(body.payment.id);
                    alreadyReservation.payment = payment;
                }
                reservation = await this.reservationRepo.save(Object.assign(alreadyReservation, updateBody));
                if (body.accommodations.length) {
                    await this.reservationAccommodationService.deleteByReservationId(reservation.id);
                    const accommodations = await this.accommodationService.findByIds(body.accommodations);
                    if (reservation && accommodations) {
                        for (const accommodation of accommodations) {
                            await this.reservationAccommodationService.create(reservation, accommodation);
                        }
                    }
                }
                if (body.description) {
                    await this.reservationDescriptionService.deleteByReservationId(reservation.id);
                    for (const desc of body.description) {
                        await this.reservationDescriptionService.create(desc, reservation);
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
    async findReservationByRole(role) {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        const dateString = date.toISOString().split("T")[0];
        const reservations = await this.reservationRepo
            .createQueryBuilder("reservation")
            .select([
            "reservation.id",
            "reservation.name",
            "reservation.contact",
            "reservation.personNumber",
            "reservation.veganNumber",
            "reservation.vegetarianNumber",
            "reservation.paymentDetails",
            "reservation.dateFrom",
            "reservation.dateTo",
        ])
            .addSelect(["accommodationsToReservation"])
            .addSelect(["accommodation.id", "accommodation.name"])
            .addSelect(["payment.id", "payment.type"])
            .addSelect(["country.id", "country.name"])
            .addSelect(["description"])
            .addSelect(["programsToDescriptions"])
            .addSelect(["program.id", "program.title", "program.type"])
            .addSelect(["foodToDescriptions"])
            .addSelect(["food.id", "food.name"])
            .leftJoin("reservation.accommodationsToReservation", "accommodationsToReservation")
            .leftJoin("accommodationsToReservation.accommodation", "accommodation")
            .leftJoinAndSelect("reservation.payment", "payment")
            .leftJoin("reservation.country", "country")
            .leftJoin("reservation.descriptions", "description")
            .leftJoin("description.programsToDescriptions", "programsToDescriptions")
            .leftJoin("programsToDescriptions.program", "program")
            .leftJoin("description.foodToDescriptions", "foodToDescriptions")
            .leftJoin("foodToDescriptions.food", "food")
            .where("reservation.dateFrom =:date", {
            date: dateString,
        })
            .orderBy("reservation.id", "ASC")
            .orderBy("accommodation.id", "ASC")
            .orderBy("program.id", "ASC")
            .getManyAndCount();
        if (reservations[1] === 0)
            return { data: "" };
        if (role === roles_enum_1.UserRoles.ADMIN || role === roles_enum_1.UserRoles.RECEPTIONIST) {
            let text = "";
            let programData = "";
            let foodData = "";
            let country = "";
            let payment = "";
            let total = 0;
            let totalVegan = 0;
            let totalVegetarian = 0;
            for (const reservation of reservations[0]) {
                const description = reservation.descriptions.map((element) => {
                    const data = new Object();
                    data["date"] = element.date.toISOString().split("T")[0];
                    data["programTitles"] = element.programsToDescriptions.map((e) => {
                        return e.program.title;
                    });
                    data["foodNames"] = element.foodToDescriptions.map((e) => {
                        return e.food.name;
                    });
                    return data;
                });
                const accommodations = reservation.accommodationsToReservation.map((element) => {
                    return element.accommodation.name;
                });
                reservation["accommodations"] = accommodations;
                reservation["description"] = description;
                delete reservation.descriptions;
                delete reservation.accommodationsToReservation;
                reservation["description"].map((e) => {
                    programData += `(Datum: ${e.date}, programi:[${e.programTitles}]); `;
                });
                reservation["description"].map((e) => {
                    foodData += `Datum: ${e.date}, obroci:[${e.foodNames}]; `;
                });
                if (reservation.payment)
                    payment = reservation.payment.type;
                if (reservation.country)
                    country = reservation.country.name;
                total += reservation.personNumber;
                totalVegan += reservation.veganNumber;
                totalVegetarian += reservation.vegetarianNumber;
                let data = `[
          |id:${reservation.id}, ime:${reservation.name}, broj osoba:${reservation.personNumber}, broj vegana:${reservation.veganNumber}, broj vegetarijanaca:${reservation.personNumber}, smestaj:[${reservation["accommodations"]}],od:${reservation.dateFrom.toISOString().split("T")[0]}, do:${reservation.dateTo.toISOString().split("T")[0]}], programi:[${programData}], tip obroka:[${foodData}], tip placanja:${payment}], detalji placanja:${reservation.paymentDetails}, drzava:${country};|
        `;
                text += data;
            }
            const textAdmin = `Broj rezervacija:${reservations[1]},ukupno osoba:${total}, ukupno vegana:${totalVegan},ukupno vegetarijanaca:${totalVegetarian}, datum: ${dateString}, opis:${text} `;
            return {
                data: textAdmin,
            };
        }
        else if (role === roles_enum_1.UserRoles.TOUR_GUIDE) {
            let text = "";
            let programData = "";
            let country = "";
            let total = 0;
            for (const reservation of reservations[0]) {
                const description = reservation.descriptions.map((element) => {
                    const data = new Object();
                    data["date"] = element.date.toISOString().split("T")[0];
                    data["programTitles"] = element.programsToDescriptions.map((e) => {
                        return e.program.title;
                    });
                    return data;
                });
                reservation["description"] = description;
                delete reservation.descriptions;
                reservation["description"].map((e) => {
                    programData += `(Datum: ${e.date}, programi:[${e.programTitles}]); `;
                });
                if (reservation.country)
                    country = reservation.country.name;
                total += reservation.personNumber;
                let data = `[|rezervacija:${reservation.id}, broj osoba:${reservation.personNumber}, od:${reservation.dateFrom.toISOString().split("T")[0]}, do:${reservation.dateTo.toISOString().split("T")[0]}], programi:[${programData}], drzava:${country};|
        `;
                text += data;
            }
            const textTourGuide = `Broj rezervacija:${reservations[1]}, ukupno osoba:${total}, datum: ${dateString}:
      ${text} `;
            return {
                data: textTourGuide,
            };
        }
        else if (role === roles_enum_1.UserRoles.COOK) {
            let text = "";
            let foodData = "";
            let total = 0;
            let totalVegan = 0;
            let totalVegetarian = 0;
            for (const reservation of reservations[0]) {
                const description = reservation.descriptions.map((element) => {
                    const data = new Object();
                    data["date"] = element.date.toISOString().split("T")[0];
                    data["foodNames"] = element.foodToDescriptions.map((e) => {
                        return e.food.name;
                    });
                    return data;
                });
                reservation["description"] = description;
                delete reservation.descriptions;
                reservation["description"].map((e) => {
                    foodData += `(Datum: ${e.date}, obroci:[${e.foodNames}]); `;
                });
                total += reservation.personNumber;
                totalVegan += reservation.veganNumber;
                totalVegetarian += reservation.vegetarianNumber;
                let data = `[| rezervacija:${reservation.id}, broj osoba:${reservation.personNumber}, broj vegana:${reservation.veganNumber}, broj vegetarijanaca:${reservation.personNumber},od:${reservation.dateFrom.toISOString().split("T")[0]}, do:${reservation.dateTo.toISOString().split("T")[0]}, obroci:${foodData}];
        `;
                text += data;
            }
            const textCook = `Broj rezervacija:${reservations[1]}, datum: ${dateString}, ukupno osoba:${total}, ukupno vegana:${totalVegan}, ukupno vegetarijanaca:${totalVegetarian}, \n :${text} }`;
            return {
                data: textCook,
            };
        }
    }
    async getReportByMealCount(date) {
        try {
            let count = [];
            if (date) {
                const dateAt = date.split("T")[0];
                count = await this.reservationRepo.query(`
      select "food"."id" , "food"."name" , SUM("personNumber") as total,SUM("veganNumber") as vegan,SUM("vegetarianNumber") as vegetarian from "reservation"
      inner join "reservation_description" on "reservation_description"."reservationId" = "reservation"."id"
      inner join "reservation_description_food" on "reservation_description_food"."descriptionId" = "reservation_description"."id"
      inner join "food" on "food".id = "reservation_description_food"."foodId"
      where "reservation_description"."date"::date = '${dateAt}'
      group by food.name, food.id
      order by food.id ASC
   `);
            }
            const total = count.length;
            return { data: count, total };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getReportByCountry(query) {
        const take = query._perPage || 10;
        const page = query._page || 1;
        const skip = (page - 1) * take;
        const sortOrder = query._sortOrder || "ASC";
        const dateFrom = query.dateFrom || new Date().toISOString().split("T")[0];
        const dateTo = query.dateTo || new Date().toISOString().split("T")[0];
        const program = query.program || [1];
        const report = await this.reservationRepo.query(`
 

 select count(country.name) as "totalReservation", country.name as id, SUM("personNumber") as total,SUM("veganNumber") as vegan,SUM("vegetarianNumber") as vegetarian from reservation
 inner join country on country.id = reservation."countryId" 
 inner join "reservation_description" on "reservation_description"."reservationId" = reservation.id
 inner join "reservation_description_program" on "reservation_description_program"."id" = "reservation_description"."reservationId"
 inner join "program" on "program".id = "reservation_description_program"."programId"
 where "reservation"."dateFrom" >= '${dateFrom}' and "reservation"."dateTo" <='${dateTo}'
 and "program"."id" in (${program})
 group by country.name
 offset ${skip}
 limit ${take}
 `);
        const count = await this.reservationRepo.query(`
    select count(country.name) as "totalReservation", country.name as id, SUM("personNumber") as total,SUM("veganNumber") as vegan,SUM("vegetarianNumber") as vegetarian from reservation
    inner join country on country.id = reservation."countryId" 
    inner join "reservation_description" on "reservation_description"."reservationId" = reservation.id
    inner join "reservation_description_program" on "reservation_description_program"."id" = "reservation_description"."reservationId"
    inner join "program" on "program".id = "reservation_description_program"."programId"
    where "reservation"."dateFrom" >= '${dateFrom}' and "reservation"."dateTo" <='${dateTo}'
    and "program"."id" in (${program})
    group by country.name
 
 `);
        const total = count.length;
        return { data: report, total };
    }
    async getReportByPayment(query) {
        const take = query._perPage || 10;
        const page = query._page || 1;
        const skip = (page - 1) * take;
        const dateFrom = query.dateFrom || new Date().toISOString().split("T")[0];
        const dateTo = query.dateTo || new Date().toISOString().split("T")[0];
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
    async getReportByContact(query) {
        const take = query._perPage || 10;
        const page = query._page || 1;
        const skip = (page - 1) * take;
        const keyword = query._q || "";
        const order = query._sortOrder || "DESC";
        const result = await this.reservationRepo.findAndCount({
            take: take,
            skip: skip,
            order: {
                id: order,
            },
            where: {
                contact: (0, typeorm_2.Like)(`%${keyword}%`),
            },
        });
        return {
            data: result[0],
            total: result[1],
        };
    }
    async getDailyReport(query) {
        const take = query._perPage || 10;
        const page = query._page || 1;
        const skip = (page - 1) * take;
        const order = query._sortOrder || "DESC";
        const date = new Date(query.date).toISOString().split("T")[0] ||
            new Date().toISOString().split("T")[0];
        const result = await this.reservationRepo.findAndCount({
            select: {
                id: true,
                name: true,
                personNumber: true,
                veganNumber: true,
                vegetarianNumber: true,
                accommodationsToReservation: true,
                descriptions: true,
            },
            relations: {
                accommodationsToReservation: { accommodation: true },
                descriptions: {
                    foodToDescriptions: { food: true },
                    programsToDescriptions: { program: true },
                },
            },
            take: take,
            skip: skip,
            order: {
                id: order,
                descriptions: {
                    programsToDescriptions: {
                        id: "ASC",
                    },
                    foodToDescriptions: {
                        id: "ASC",
                    },
                },
                accommodationsToReservation: {
                    id: "ASC",
                },
            },
            where: {
                descriptions: {
                    date: (0, typeorm_2.Equal)(new Date(date)),
                },
            },
        });
        const reservations = result[0];
        const data = reservations.map((reservation) => {
            const data = reservation.descriptions.map((element) => {
                const data = new Object();
                data["date"] = element.date.toISOString().split("T")[0];
                data["programTitles"] = element.programsToDescriptions.map((e) => {
                    return e.program.title;
                });
                data["foodNames"] = element.foodToDescriptions.map((e) => {
                    return e.food.name;
                });
                return data;
            });
            const accommodations = reservation.accommodationsToReservation.map((element) => {
                return element.accommodation.name;
            });
            reservation["accommodations"] = accommodations;
            reservation["description"] = data;
            delete reservation.descriptions;
            delete reservation.accommodationsToReservation;
            return reservation;
        });
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
    (0, schedule_1.Cron)("0 0 12 * * *"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReservationService.prototype, "cronJob", null);
ReservationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reservation_entity_1.Reservation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        country_service_1.CountryService,
        accommodation_service_1.AccommodationService,
        payment_service_1.PaymentService,
        user_service_1.UserService,
        mail_service_1.MailService,
        typeorm_2.DataSource,
        reservation_accommodation_service_1.ReservationAccommodationService,
        reservation_description_service_1.ReservationDescriptionService])
], ReservationService);
exports.ReservationService = ReservationService;
//# sourceMappingURL=reservation.service.js.map