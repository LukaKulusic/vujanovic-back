import {
  BadGatewayException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Program } from 'src/program/entity/program.entity';
import { Reservation } from 'src/reservation/entity/reservation.entity';
import { Repository } from 'typeorm';
import { ReservationProgram } from './entity/reservation-program.entity';

@Injectable()
export class ReservationProgramService {
  constructor(
    @InjectRepository(ReservationProgram)
    private reservationProgramRepo: Repository<ReservationProgram>,
  ) {}

  async create(
    reservation: Reservation,
    program: Program,
  ): Promise<ReservationProgram> {
    try {
      const reservationProgram = this.reservationProgramRepo.create({
        reservation,
        program,
      });
      await this.reservationProgramRepo.save(reservationProgram);
      return reservationProgram;
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }
  async deleteByReservationId(id: number) {
    return await this.reservationProgramRepo
      .createQueryBuilder()
      .delete()
      .from(ReservationProgram)
      .where('reservation.id = :id', { id })
      .execute();
  }
}
