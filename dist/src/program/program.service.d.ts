import { Repository } from "typeorm";
import { UpdateProgramDto } from "./dto/update-program.dto";
import { ProgramDto } from "./dto/program.dto";
import { Program } from "./entity/program.entity";
import { UpdateProgramsDto } from "./dto/update-programs.dto";
export declare class ProgramService {
    private programRepo;
    constructor(programRepo: Repository<Program>);
    getList(query: any): Promise<{
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
    getMany(ids: Array<number>): Promise<{
        data: Program[];
    }>;
    getOne(id: number): Promise<{
        data: {
            id: number;
            title: string;
            description: string;
            createdDate: Date;
            updatedDate: Date;
            programsToReservation: import("../reservation-program/entity/reservation-program.entity").ReservationProgram[];
        };
    }>;
    findAll(): Promise<Program[]>;
    findOne(id: number): Promise<Program>;
    findOneByName(title: string): Promise<Program>;
    findByIds(ids: number[]): Promise<Program[]>;
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
    updateMany(body: UpdateProgramsDto[]): Promise<{
        data: any[];
    }>;
    delete(id: number): Promise<{
        data: number[];
    }>;
    deleteMany(ids: Array<number>): Promise<{
        data: number[];
    }>;
    getProgramIdsByReservationId(id: number): Promise<Program[]>;
}
