import { ReservationDescriptionProgram } from 'src/reservation-description-program/entity/reservation-description-program.entity';
import { BaseEntity } from 'typeorm';
import { ProgramType } from './enum/program.enum';
export declare class Program extends BaseEntity {
    id: number;
    title: string;
    description: string;
    type: ProgramType;
    createdDate: Date;
    updatedDate: Date;
    programsToDescription: ReservationDescriptionProgram[];
}
