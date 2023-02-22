import { Program } from 'src/program/entity/program.entity';
import { Reservation } from 'src/reservation/entity/reservation.entity';
import { Repository } from 'typeorm';
import { ReservationProgram } from './entity/reservation-program.entity';
export declare class ReservationProgramService {
    private reservationProgramRepo;
    constructor(reservationProgramRepo: Repository<ReservationProgram>);
    create(reservation: Reservation, program: Program): Promise<ReservationProgram>;
    deleteByReservationId(id: number): Promise<import("typeorm").DeleteResult>;
}
