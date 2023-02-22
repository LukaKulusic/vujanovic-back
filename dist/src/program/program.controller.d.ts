import { Request } from 'express';
import { ProgramDto } from './dto/program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { ProgramService } from './program.service';
import { GetManyDto } from 'src/user/dto/get-many-user.dto';
import { UpdateManyProgramDto } from './dto/update-many-program.dto';
export declare class ProgramController {
    private readonly programService;
    constructor(programService: ProgramService);
    getList(req: Request): Promise<{
        data: {
            id: number;
            title: string;
            description: string;
            createdDate: Date;
            updatedDate: Date;
            programsToReservation: import("../reservation-program/entity/reservation-program.entity").ReservationProgram[];
        }[];
        total: number;
    }>;
    getById(id: number): Promise<{
        data: {
            id: number;
            title: string;
            description: string;
            createdDate: Date;
            updatedDate: Date;
            programsToReservation: import("../reservation-program/entity/reservation-program.entity").ReservationProgram[];
        };
    }>;
    getMany(body: GetManyDto): Promise<{
        data: import("./entity/program.entity").Program[];
    }>;
    update(id: number, body: UpdateProgramDto): Promise<{
        data: {
            id: number;
            title: string;
            description: string;
            createdDate: Date;
            updatedDate: Date;
            programsToReservation: import("../reservation-program/entity/reservation-program.entity").ReservationProgram[];
        };
    }>;
    updateMany(body: UpdateManyProgramDto): Promise<{
        data: any[];
    }>;
    create(body: ProgramDto): Promise<{
        data: {
            id: number;
            title: string;
            description: string;
            createdDate: Date;
            updatedDate: Date;
            programsToReservation: import("../reservation-program/entity/reservation-program.entity").ReservationProgram[];
        };
    }>;
    deleteUser(id: number): Promise<{
        data: number[];
    }>;
    deleteMany(body: GetManyDto): Promise<{
        data: number[];
    }>;
}
