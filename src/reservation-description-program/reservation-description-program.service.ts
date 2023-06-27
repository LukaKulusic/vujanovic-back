import {
  BadGatewayException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Program } from "src/program/entity/program.entity";
import { ReservationDescription } from "src/reservation-description/entity/reservation-description.entity";
import { Reservation } from "src/reservation/entity/reservation.entity";
import { Repository } from "typeorm";
import { ReservationDescriptionProgram } from "./entity/reservation-description-program.entity";

@Injectable()
export class ReservationDescriptionProgramService {
  constructor(
    @InjectRepository(ReservationDescriptionProgram)
    private reservationDescriptionProgramRepo: Repository<ReservationDescriptionProgram>
  ) {}

  async create(
    program: Program,
    description: ReservationDescription,
    programPersonNumber: number
  ): Promise<ReservationDescriptionProgram> {
    try {
      const ReservationDescriptionProgram =
        this.reservationDescriptionProgramRepo.create({
          program,
          description,
          programPersonNumber,
        });
      await this.reservationDescriptionProgramRepo.save(
        ReservationDescriptionProgram
      );
      return ReservationDescriptionProgram;
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }
  async deleteByReservationId(id: number) {
    return await this.reservationDescriptionProgramRepo
      .createQueryBuilder()
      .delete()
      .from(ReservationDescriptionProgram)
      .where("reservation.id = :id", { id })
      .execute();
  }
}
