import { HttpException } from "@nestjs/common";
import { Request, Response } from "express";
import { ReservationDto } from "./dto/reservation.dto";
import { UpdateReservationDto } from "./dto/update-reservation.dto";
import { UserRoles } from "src/user/entity/enum/roles.enum";
import { ReservationService } from "./reservation.service";
import { GetManyDto } from "src/user/dto/get-many-user.dto";
import { UpdateManyReservationDto } from "./dto/update-many-reservation.dto";
export declare class ReservationController {
    private readonly reservationService;
    constructor(reservationService: ReservationService);
    getAll(req: Request): Promise<{
        data: import("./entity/reservation.entity").Reservation[];
        total: number;
    }>;
    getById(id: number): Promise<{
        data: import("./entity/reservation.entity").Reservation;
    }>;
    getApiData(req: Request): Promise<{
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
            name: import("../program/entity/enum/program.enum").ProgramType;
        } | {
            id: number;
            name: import("../program/entity/enum/program.enum").ProgramType;
        })[];
    }>;
    getMany(body: GetManyDto): Promise<{
        data: import("./entity/reservation.entity").Reservation[];
    }>;
    update(id: number, body: UpdateReservationDto, res: Response): Promise<void>;
    updateMany(body: UpdateManyReservationDto): Promise<{
        data: any[];
    }>;
    create(body: ReservationDto, res: Response): Promise<void>;
    deleteUser(id: number): Promise<{
        data: number[];
    }>;
    deleteMany(body: GetManyDto): Promise<{
        data: number[];
    }>;
    getReservationByRole(user: any): Promise<HttpException | {
        data: string;
    }>;
    getReportByCountry(query: any): Promise<{
        data: any;
        total: any;
    }>;
    getReportByCash(query: any): Promise<{
        data: import("./entity/reservation.entity").Reservation[];
        total: number;
    }>;
}
