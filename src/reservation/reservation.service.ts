import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  Between,
  DataSource,
  ILike,
  In,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from "typeorm";
import { UpdateReservationDto } from "./dto/update-reservation.dto";
import { ReservationDto } from "./dto/reservation.dto";
import { Reservation } from "./entity/reservation.entity";
import { UserRoles, UserRolesObject } from "../user/entity/enum/roles.enum";
import { CountryService } from "src/country/country.service";
import { FoodService } from "src/food/food.service";
import { AccommodationService } from "src/accommodation/accommodation.service";
import { IFilterReservationQuery } from "./interface/filter-reservation.interface";
import { UpdateReservationsDto } from "./dto/update-reservations.dto";
import { PaymentService } from "src/payment/payment.service";
import { ProgramService } from "src/program/program.service";
import { ReservationProgramService } from "src/reservation-program/reservation-program.service";
import { ProgramTypeObject } from "src/program/entity/enum/program.enum";
import { ReportByCountryDto } from "./dto/report-country.dto";
import { ReportByCashDto } from "./dto/report-cash.dto";
import { MailService } from "src/mail/mail.service";
import { Cron } from "@nestjs/schedule";
import { UserService } from "src/user/user.service";

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepo: Repository<Reservation>,
    private readonly countryService: CountryService,
    private readonly foodService: FoodService,
    private readonly accommodationService: AccommodationService,
    private readonly paymentService: PaymentService,
    private readonly reservationProgramService: ReservationProgramService,
    private readonly programService: ProgramService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly dataSource: DataSource
  ) {}

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

  async getMany(ids: Array<number>) {
    const result = await this.reservationRepo
      .createQueryBuilder("reservation")
      .where("reservation.id IN (:...ids)", { ids: ids })
      .getMany();
    if (result) return { data: result };
  }

  async getApiData() {
    const food = await this.dataSource.query(`select id,name from food `);
    const accommodation = await this.dataSource.query(
      `select id,name from accommodation `
    );
    const program = await this.dataSource.query(
      `select id,title as name from program `
    );
    const country = await this.dataSource.query(`select id,name from country `);
    const payment = await this.dataSource.query(
      `select id,type as name from payment `
    );

    return {
      food,
      accommodation,
      program,
      country,
      payment,
      roles: Object.values(UserRolesObject),
      programTypes: Object.values(ProgramTypeObject),
    };
  }

  async findAll(): Promise<Reservation[]> {
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

  async findOne(id: number): Promise<Reservation> {
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
      throw new HttpException("Reservation not found", HttpStatus.NOT_FOUND);
    }
    return reservation;
  }
  // async getOne(id: number) {
  //   const result = await this.reservationRepo.findOne({
  //     where: { id: id },
  //     relations: [
  //       'food',
  //       'accommodation',
  //       'payment',
  //       'country',
  //       'programsToReservation.program',
  //     ],
  //   });
  //   if (!result) {
  //     throw new HttpException('Reservation not found', HttpStatus.NOT_FOUND);
  //   }
  //   return { data: result };
  // }

  async getOne(id: number) {
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
      throw new HttpException("Reservation not found", HttpStatus.NOT_FOUND);
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
  async findOneByName(name: string): Promise<Reservation> {
    const reservation = await this.reservationRepo.findOne({
      where: { name: name },
    });
    return reservation;
  }
  async newReservationEmail(text: string) {
    const users = await this.userService.findWithRole();
    const filteredUsers = users.filter((e) => {
      return e.role === UserRoles.ADMIN || e.role === UserRoles.RECEPTIONIST;
    });

    for (const user of filteredUsers) {
      await this.mailService.sendEmail(user.email, text);
    }
  }

  async create(body: ReservationDto): Promise<Reservation> {
    try {
      let country;
      if (body.country) {
        country = await this.countryService.findOne(body.country.id);
      }
      const food = await this.foodService.findOne(body.food.id);
      const accommodation = await this.accommodationService.findOne(
        body.accommodation.id
      );
      const payment = await this.paymentService.findOne(body.payment.id);

      if (food && accommodation && payment) {
        const newReservation = this.reservationRepo.create({
          ...body,
          country,
          food,
          accommodation,
          payment,
        });
        const reservation = await this.reservationRepo.save(newReservation);

        const programs = await this.programService.findByIds(body.programs);
        if (reservation && programs) {
          for (const program of programs) {
            await this.reservationProgramService.create(reservation, program);
          }

          return reservation;
        }
      } else throw new HttpException(`Bad request! `, HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(
        `Bad request!${error.message} `,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async update(id: number, body: UpdateReservationDto) {
    try {
      const alreadyReservation = await this.reservationRepo.findOneBy({ id });
      let reservation;
      if (alreadyReservation) {
        if (body.accommodation) {
          const accommodation = await this.accommodationService.findOne(
            body.accommodation.id
          );
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

        reservation = await this.reservationRepo.save(
          Object.assign(alreadyReservation, body)
        );

        if (body.programs) {
          await this.reservationProgramService.deleteByReservationId(
            reservation.id
          );
          const programs = await this.programService.findByIds(body.programs);
          if (reservation && programs) {
            for (const program of programs) {
              await this.reservationProgramService.create(reservation, program);
            }
          }
        }
        return await this.getOne(id);
      }
    } catch (error) {
      throw new HttpException(
        `Bad request! ${error.message}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }
  async updateMany(body: UpdateReservationsDto[]) {
    let result = [];

    for (let i = 0; i < body.length; i++) {
      const alreadyReservation = await this.reservationRepo.findOneBy({
        id: body[i].id,
      });
      if (alreadyReservation) {
        await this.reservationRepo.save(
          Object.assign(alreadyReservation, body[i])
        );

        result.push(await this.findOne(body[i].id));
      }
    }
    return { data: result };
  }

  async delete(id: number) {
    const result = await this.reservationRepo.delete(id);
    return { data: [result.affected] };
  }
  async deleteMany(ids: Array<number>) {
    const result = await this.reservationRepo
      .createQueryBuilder()
      .delete()
      .from(Reservation)
      .where("id IN (:...ids)", { ids: ids })
      .execute();
    if (result) return { data: [result.affected] };
  }
  async findAllReservationWithFilters(
    query: IFilterReservationQuery,
    take: number,
    skip: number
  ) {
    const { fromDate, toDate, food, accommodation, program, country } = query;

    const filters = [];
    if (food) filters.push({ food: { id: In([...food]) } });
    if (accommodation)
      filters.push({ accommodation: { id: In([...accommodation]) } });
    if (country) filters.push({ country: { id: In([...country]) } });
    if (program)
      filters.push({ programsToReservation: { id: In([...program]) } });

    if (fromDate && toDate) {
      filters.push({ dateFrom: MoreThanOrEqual(fromDate) });
      filters.push({ dateTo: LessThanOrEqual(toDate) });
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
  async findReservationByRole(role: UserRoles) {
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

    if (reservations[1] === 0) return { data: "" };

    if (role === UserRoles.ADMIN) {
      //ADMIN
      let text = "";
      for (const reservation of reservations[0]) {
        const programs = [];
        programs.push(
          reservation.programsToReservation.map((e) => {
            return e.program.title;
          })
        );
        let data = `[id:${reservation.id}, ime:${
          reservation.name
        }, broj osoba:${reservation.personNumber}, smestaj:${
          reservation.accommodation.name
        }, od:${reservation.dateFrom.toISOString().split("T")[0]}, do:${
          reservation.dateTo.toISOString().split("T")[0]
        }], programi:[${programs}], tip obroka:${
          reservation.food.name
        }, tip placanja:${reservation.payment.type}],   `;
        text += data;
      }

      const textAdmin = ` Broj rezervacija:${reservations[1]}, datum: ${dateString} :${text} `;
      return {
        data: textAdmin,
      };
    } else if (role === UserRoles.RECEPTIONIST) {
      //RECEPTIONIST
      let text = "";
      for (const reservation of reservations[0]) {
        const programs = [];
        programs.push(
          reservation.programsToReservation.map((e) => {
            return e.program.title;
          })
        );
        let data = `[id:${reservation.id}, ime:${
          reservation.name
        }, broj osoba:${reservation.personNumber}, smestaj:${
          reservation.accommodation.name
        }, od:${reservation.dateFrom.toISOString().split("T")[0]}, do:${
          reservation.dateTo.toISOString().split("T")[0]
        }], programi:[${programs}], tip obroka:${
          reservation.food.name
        }, tip placanja:${reservation.payment.type}
      ]   ,`;
        text += data;
      }

      const textReceptionist = ` Broj rezervacija:${reservations[1]}, datum: ${dateString} :${text} `;
      return {
        data: textReceptionist,
      };
    }

    if (role === UserRoles.TOUR_GUIDE) {
      //TOUR GUIDE
      let text = "";

      for (const reservation of reservations[0]) {
        const programs = [];
        programs.push(
          reservation.programsToReservation.map((e) => {
            return e.program.title;
          })
        );
        let data = `[id:${reservation.id}, ime:${
          reservation.name
        }, broj osoba:${reservation.personNumber}, programi:[${programs}], od:${
          reservation.dateFrom.toISOString().split("T")[0]
        }, do:${reservation.dateTo.toISOString().split("T")[0]}], 
                                                 
          `;
        text += data;
      }
      const textTourGuide = ` Broj rezervacija:${reservations[1]}, datum: ${dateString} \n :${text} `;
      return {
        data: textTourGuide,
      };
    } else if (role === UserRoles.COOK) {
      //COOK
      // const meals = await this.reservationRepo
      //   .createQueryBuilder('reservation')
      //   .leftJoin('reservation.food', 'food')
      //   .where('reservation.dateFrom =:date', {
      //     date: dateString,
      //   })
      //   .select('sum(reservation.personNumber)', 'total')
      //   .addSelect('food.name')
      //   .addSelect('sum(reservation.veganNumber)', 'totalVegan')
      //   .groupBy('food.name')
      //   .getRawMany();

      let text = "";
      let total: number = 0;
      let totalVegan: number = 0;

      for (const reservation of reservations[0]) {
        let data = `[id:${reservation.id}, ime:${
          reservation.name
        }, broj osoba:${reservation.personNumber},broj vegana:${
          reservation.veganNumber
        }, tip obroka:${reservation.food.name}, od:${
          reservation.dateFrom.toISOString().split("T")[0]
        }, do:${reservation.dateTo.toISOString().split("T")[0]}], 
                                                 
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

  @Cron("0 0 12 * * *")
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
}
