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
            programsToDescription: import("../reservation-description-program/entity/reservation-description-program.entity").ReservationDescriptionProgram[];
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
            programsToDescription: import("../reservation-description-program/entity/reservation-description-program.entity").ReservationDescriptionProgram[];
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
            programsToDescription: import("../reservation-description-program/entity/reservation-description-program.entity").ReservationDescriptionProgram[];
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
            programsToDescription: import("../reservation-description-program/entity/reservation-description-program.entity").ReservationDescriptionProgram[];
        };
    }>;
    deleteUser(id: number): Promise<{
        data: number[];
    }>;
    deleteMany(body: GetManyDto): Promise<{
        data: number[];
    }>;
}
