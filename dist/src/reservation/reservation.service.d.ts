import { DataSource, Repository } from "typeorm";
import { UpdateReservationDto } from "./dto/update-reservation.dto";
import { ReservationDto } from "./dto/reservation.dto";
import { Reservation } from "./entity/reservation.entity";
import { UserRoles } from "../user/entity/enum/roles.enum";
import { CountryService } from "src/country/country.service";
import { AccommodationService } from "src/accommodation/accommodation.service";
import { UpdateReservationsDto } from "./dto/update-reservations.dto";
import { PaymentService } from "src/payment/payment.service";
import { MailService } from "src/mail/mail.service";
import { UserService } from "src/user/user.service";
import { ReservationAccommodationService } from "src/reservation-accommodation/reservation-accommodation.service";
import { ReservationDescriptionService } from "src/reservation-description/reservation-description.service";
export declare class ReservationService {
    private reservationRepo;
    private readonly countryService;
    private readonly accommodationService;
    private readonly paymentService;
    private readonly userService;
    private readonly mailService;
    private readonly dataSource;
    private readonly reservationAccommodationService;
    private readonly reservationDescriptionService;
    constructor(reservationRepo: Repository<Reservation>, countryService: CountryService, accommodationService: AccommodationService, paymentService: PaymentService, userService: UserService, mailService: MailService, dataSource: DataSource, reservationAccommodationService: ReservationAccommodationService, reservationDescriptionService: ReservationDescriptionService);
    getList(query: any): Promise<{
        data: any;
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
    findReservationByRole(role: UserRoles): Promise<{
        data: string;
    }>;
    getReportByMealCount(date: any): Promise<{
        data: any[];
        total: number;
    }>;
    getReportByProgramCount(date: any): Promise<{
        data: any[];
        total: number;
    }>;
    getReportByCountry(query: any): Promise<{
        data: any;
        total: any;
    }>;
    getReportByPayment(query: any): Promise<{
        data: Reservation[];
        total: number;
    }>;
    getReportByContact(query: any): Promise<{
        data: Reservation[];
        total: number;
    }>;
    getDailyReport(query: any): Promise<{
        data: Reservation[];
        total: number;
    }>;
    paginate: (items: any, page?: number, perPage?: number) => any;
    cronJob(): Promise<void>;
}
