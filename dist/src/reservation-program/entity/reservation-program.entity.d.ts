import { Program } from 'src/program/entity/program.entity';
import { Reservation } from 'src/reservation/entity/reservation.entity';
import { BaseEntity } from 'typeorm';
export declare class ReservationProgram extends BaseEntity {
    id: number;
    reservation: Reservation;
    program: Program;
}
