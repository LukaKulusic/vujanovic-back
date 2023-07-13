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
            .where(`description.date >= '${new Date(dateFrom).toISOString()}' AND reservation.dateFrom <= '${new Date(dateTo).toISOString()}'`)
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
        let programData = "";
        const data = result.descriptions.map((e) => {
            const data = new Object();
            data["date"] = e.date.toISOString().split("T")[0];
            data["programIds"] = e.programsToDescriptions.map((e) => {
                return {
                    programId: e.program.id,
                    personNumber: e.programPersonNumber,
                };
            });
            data["foodIds"] = e.foodToDescriptions.map((e) => {
                return {
                    foodId: e.food.id,
                    personNumber: e.foodPersonNumber,
                    veganNumber: e.foodVeganNumber,
                    vegetarianNumber: e.foodVegetarianNumber,
                    glutenFreeNumber: e.foodGlutenFreeNumber,
                };
            });
            data["programNames"] = e.programsToDescriptions.map((e) => {
                return e.program.title;
            });
            programData += `<div>Datum: ${data["date"]}, programi: [${data["programNames"]}];</div> `;
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
        result["programData"] = programData;
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
        for (const user of users) {
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
                    programData += `<div>Datum: ${e.date}, programi: ${e.programTitles};</div> `;
                });
                reservation["description"].map((e) => {
                    foodData += `<div>Datum: ${e.date}, obroci: ${e.foodNames};</div> `;
                });
                if (reservation.payment)
                    payment = reservation.payment.type;
                if (reservation.country)
                    country = reservation.country.name;
                total += reservation.personNumber;
                totalVegan += reservation.veganNumber;
                totalVegetarian += reservation.vegetarianNumber;
                let data = `
        <div>
        <hr style="border: 1px solid black; margin-top: 20px;">
          <p><strong>ID:</strong> ${reservation.id}</p>
          <p><strong>Name:</strong> ${reservation.name}</p>
          <p><strong>Number of People:</strong> ${reservation.personNumber}</p>
          <p><strong>Number of Vegans:</strong> ${reservation.veganNumber}</p>
          <p><strong>Number of Vegetarians:</strong> ${reservation.personNumber}</p>
          <p><strong>Accommodation:</strong> ${reservation["accommodations"]}</p>
          <p><strong>From:</strong> ${reservation.dateFrom.toISOString().split("T")[0]}</p>
          <p><strong>To:</strong> ${reservation.dateTo.toISOString().split("T")[0]}</p>
          <p><strong>Programs:</strong> ${programData}</p>
          <p><strong>Meal Type:</strong> ${foodData}</p>
          <p><strong>Payment Type:</strong> ${payment}</p>
          <p><strong>Payment Details:</strong> ${reservation.paymentDetails}</p>
          <p><strong>Country:</strong> ${country}</p>
          <hr style="border: 1px solid black; margin-top: 20px;">
        </div>
      `;
                text += data;
            }
            const textAdmin = `
      <div>
        <p><strong>Number of Reservations:</strong> ${reservations[1]}</p>
        <p><strong>Total Number of People:</strong> ${total}</p>
        <p><strong>Total Number of Vegans:</strong> ${totalVegan}</p>
        <p><strong>Total Number of Vegetarians:</strong> ${totalVegetarian}</p>
        <p><strong>Date:</strong> ${dateString}</p>
        <p><strong>Description:</strong> ${text}</p>
      </div>
    `;
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
                    programData += `<div>Datum: ${e.date}, programi: ${e.programTitles};</div> `;
                });
                if (reservation.country)
                    country = reservation.country.name;
                total += reservation.personNumber;
                let data = `
  <div>
  <hr style="border: 1px solid black; margin-top: 20px;">
    <p><strong>Reservation:</strong> ${reservation.id}</p>
    <p><strong>Number of People:</strong> ${reservation.personNumber}</p>
    <p><strong>From:</strong> ${reservation.dateFrom.toISOString().split("T")[0]}</p>
    <p><strong>To:</strong> ${reservation.dateTo.toISOString().split("T")[0]}</p>
    <p><strong>Programs:</strong> ${programData}</p>
    <p><strong>Country:</strong> ${country}</p>
    <hr style="border: 1px solid black; margin-top: 20px;">
  </div>
`;
                text += data;
            }
            const textTourGuide = `
      <div>
        <p><strong>Number of Reservations:</strong> ${reservations[1]}</p>
        <p><strong>Total Number of People:</strong> ${total}</p>
        <p><strong>Date:</strong> ${dateString}</p>
        <p><strong>Reservation Details:</strong></p>
        ${text}
      </div>
    `;
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
                    foodData += `<div>Datum: ${e.date}, obroci: ${e.foodNames};</div> `;
                });
                total += reservation.personNumber;
                totalVegan += reservation.veganNumber;
                totalVegetarian += reservation.vegetarianNumber;
                let data = `
  <div>
    <hr style="border: 1px solid black; margin-top: 20px;">
    <p><strong>Reservation:</strong> ${reservation.id}</p>
    <p><strong>Number of People:</strong> ${reservation.personNumber}</p>
    <p><strong>Number of Vegans:</strong> ${reservation.veganNumber}</p>
    <p><strong>Number of Vegetarians:</strong> ${reservation.personNumber}</p>
    <p><strong>From:</strong> ${reservation.dateFrom.toISOString().split("T")[0]}</p>
    <p><strong>To:</strong> ${reservation.dateTo.toISOString().split("T")[0]}</p>
    <p><strong>Meals:</strong> ${foodData}</p>
    <hr style="border: 1px solid black; margin-top: 20px;">
  </div>
`;
                text += data;
            }
            const textCook = `
      <div>
        <p><strong>Number of Reservations:</strong> ${reservations[1]}</p>
        <p><strong>Date:</strong> ${dateString}</p>
        <p><strong>Total Number of People:</strong> ${total}</p>
        <p><strong>Total Number of Vegans:</strong> ${totalVegan}</p>
        <p><strong>Total Number of Vegetarians:</strong> ${totalVegetarian}</p>
        <p><strong>Description:</strong></p>
        <p>${text}</p>
      </div>
    `;
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
     
      SELECT
  "food"."id",
  "food"."name",
  SUM("reservation_description_food"."foodPersonNumber") AS total,
  SUM("reservation_description_food"."foodVeganNumber") AS vegan,
  SUM("reservation_description_food"."foodVegetarianNumber") AS vegetarian,
  SUM("reservation_description_food"."foodGlutenFreeNumber") AS glutenFree

FROM
  "reservation"
  INNER JOIN "reservation_description" ON "reservation_description"."reservationId" = "reservation"."id"
  INNER JOIN "reservation_description_food" ON "reservation_description_food"."descriptionId" = "reservation_description"."id"
  INNER JOIN "food" ON "food"."id" = "reservation_description_food"."foodId"
WHERE
  DATE_TRUNC('day', "reservation_description"."date") = DATE_TRUNC('day', '${dateAt}'::DATE)
GROUP BY
  "food"."id",
  "food"."name"
ORDER BY
  "food"."id" ASC;

   `);
            }
            const total = count.length;
            return { data: count, total };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getReportByProgramCount(date) {
        try {
            let count = [];
            if (date) {
                const dateAt = date.split("T")[0];
                count = await this.reservationRepo.query(`
     
      SELECT
  "program"."id",
  "program"."title",
  sum("reservation_description_program"."programPersonNumber") AS total
FROM
  "reservation"
  INNER JOIN "reservation_description" ON "reservation_description"."reservationId" = "reservation"."id"
  INNER JOIN "reservation_description_program" ON "reservation_description_program"."descriptionId" = "reservation_description"."id"
  INNER JOIN "program" ON "program"."id" = "reservation_description_program"."programId"
WHERE
  DATE_TRUNC('day', "reservation_description"."date") = DATE_TRUNC('day', '${dateAt}'::DATE)
GROUP BY
  "program"."id",
  "program"."title"
ORDER BY
  "program"."id" ASC;

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
 

SELECT
  COUNT(country.name) AS "totalReservation",
  country.name AS id,
  SUM("personNumber") AS total,
  SUM("veganNumber") AS vegan,
  SUM("vegetarianNumber") AS vegetarian
FROM
  reservation
  INNER JOIN country ON country.id = reservation."countryId" 
  INNER JOIN "reservation_description" ON "reservation_description"."reservationId" = reservation.id
  INNER JOIN "reservation_description_program" ON "reservation_description_program"."descriptionId" = "reservation_description"."id"
  INNER JOIN "program" ON "program".id = "reservation_description_program"."programId"
WHERE
  "reservation"."dateFrom" >= '${dateFrom}' AND "reservation"."dateTo" <= '${dateTo}'
  AND "program"."id" IN (${program})
GROUP BY
  country.name
OFFSET ${skip}
LIMIT ${take}

 `);
        const count = await this.reservationRepo.query(`
    SELECT
  COUNT(country.name) AS "totalReservation",
  country.name AS id,
  SUM("personNumber") AS total,
  SUM("veganNumber") AS vegan,
  SUM("vegetarianNumber") AS vegetarian
FROM
  reservation
  INNER JOIN country ON country.id = reservation."countryId" 
  INNER JOIN "reservation_description" ON "reservation_description"."reservationId" = reservation.id
  INNER JOIN "reservation_description_program" ON "reservation_description_program"."descriptionId" = "reservation_description"."id"
  INNER JOIN "program" ON "program".id = "reservation_description_program"."programId"
WHERE
  "reservation"."dateFrom" >= '${dateFrom}' AND "reservation"."dateTo" <= '${dateTo}'
  AND "program"."id" IN (${program})
GROUP BY
  country.name
 
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
            "reservation.paymentDetails",
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
        const result = await this.reservationRepo
            .createQueryBuilder("reservation")
            .select([
            "reservation.id",
            "reservation.name",
            "reservation.contact",
            "reservation.personNumber",
            "reservation.veganNumber",
            "reservation.vegetarianNumber",
        ])
            .addSelect(["accommodationsToReservation"])
            .addSelect(["accommodation.id", "accommodation.name"])
            .addSelect(["description"])
            .addSelect(["programsToDescriptions"])
            .addSelect(["program.id", "program.title", "program.type"])
            .addSelect(["foodToDescriptions"])
            .addSelect(["food.id", "food.name"])
            .leftJoin("reservation.accommodationsToReservation", "accommodationsToReservation")
            .leftJoin("accommodationsToReservation.accommodation", "accommodation")
            .leftJoin("reservation.descriptions", "description")
            .leftJoin("description.programsToDescriptions", "programsToDescriptions")
            .leftJoin("programsToDescriptions.program", "program")
            .leftJoin("description.foodToDescriptions", "foodToDescriptions")
            .leftJoin("foodToDescriptions.food", "food")
            .where(`description.date >= '${new Date(date).toISOString()}' 
         AND description.date < '${new Date(date).toISOString()}'::timestamp + INTERVAL '1 day'`)
            .orderBy("reservation.id", order)
            .addOrderBy("accommodation.id", "ASC")
            .addOrderBy("foodToDescriptions.id", "ASC")
            .addOrderBy("accommodationsToReservation.id", "ASC")
            .addOrderBy("programsToDescriptions.id", "ASC")
            .getManyAndCount();
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