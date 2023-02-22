import { ReservationProgram } from 'src/reservation-program/entity/reservation-program.entity';
import { BaseEntity } from 'typeorm';
import { ProgramType } from './enum/program.enum';
export declare class Program extends BaseEntity {
    id: number;
    title: string;
    description: string;
    type: ProgramType;
    createdDate: Date;
    updatedDate: Date;
    programsToReservation: ReservationProgram[];
}
