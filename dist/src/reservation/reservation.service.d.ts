import { DataSource, Repository } from "typeorm";
import { UpdateReservationDto } from "./dto/update-reservation.dto";
import { ReservationDto } from "./dto/reservation.dto";
import { Reservation } from "./entity/reservation.entity";
import { UserRoles } from "../user/entity/enum/roles.enum";
import { CountryService } from "src/country/country.service";
import { FoodService } from "src/food/food.service";
import { AccommodationService } from "src/accommodation/accommodation.service";
import { IFilterReservationQuery } from "./interface/filter-reservation.interface";
import { UpdateReservationsDto } from "./dto/update-reservations.dto";
import { PaymentService } from "src/payment/payment.service";
import { ProgramService } from "src/program/program.service";
import { ReservationProgramService } from "src/reservation-program/reservation-program.service";
import { MailService } from "src/mail/mail.service";
import { UserService } from "src/user/user.service";
export declare class ReservationService {
    private reservationRepo;
    private readonly countryService;
    private readonly foodService;
    private readonly accommodationService;
    private readonly paymentService;
    private readonly reservationProgramService;
    private readonly programService;
    private readonly userService;
    private readonly mailService;
    private readonly dataSource;
    constructor(reservationRepo: Repository<Reservation>, countryService: CountryService, foodService: FoodService, accommodationService: AccommodationService, paymentService: PaymentService, reservationProgramService: ReservationProgramService, programService: ProgramService, userService: UserService, mailService: MailService, dataSource: DataSource);
    getList(query: any): Promise<{
        data: Reservation[];
        total: number;
    }>;
    getMany(ids: Array<number>): Promise<{
        data: Reservation[];
    }>;
    getApiData(): Promise<{
        food: any;
        accommodation: any;
        program: any;
        country: any;
        payment: any;
        roles: ({
            id: number;
            name: UserRoles;
        } | {
            id: number;
            name: UserRoles;
        } | {
            id: number;
            name: UserRoles;
        } | {
            id: number;
            name: UserRoles;
        } | {
            id: number;
            name: UserRoles;
        })[];
        programTypes: ({
            id: number;
            name: import("src/program/entity/enum/program.enum").ProgramType;
        } | {
            id: number;
            name: import("src/program/entity/enum/program.enum").ProgramType;
        })[];
    }>;
    findAll(): Promise<Reservation[]>;
    findOne(id: number): Promise<Reservation>;
    getOne(id: number): Promise<{
        data: Reservation;
    }>;
    findOneByName(name: string): Promise<Reservation>;
    newReservationEmail(text: string): Promise<void>;
    create(body: ReservationDto): Promise<Reservation>;
    update(id: number, body: UpdateReservationDto): Promise<{
        data: Reservation;
    }>;
    updateMany(body: UpdateReservationsDto[]): Promise<{
        data: any[];
    }>;
    delete(id: number): Promise<{
        data: number[];
    }>;
    deleteMany(ids: Array<number>): Promise<{
        data: number[];
    }>;
    findAllReservationWithFilters(query: IFilterReservationQuery, take: number, skip: number): Promise<[Reservation[], number]>;
    findReservationByRole(role: UserRoles): Promise<{
        data: string;
    }>;
    getReportByCountry(query: any): Promise<{
        data: any;
        total: any;
    }>;
    getReportByCash(query: any): Promise<{
        data: Reservation[];
        total: number;
    }>;
    cronJob(): Promise<void>;
}
