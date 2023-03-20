import { BadGatewayException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accommodation } from 'src/accommodation/entity/accommodation.entity';
import { Reservation } from 'src/reservation/entity/reservation.entity';
import { Repository } from 'typeorm';
import { ReservationAccommodation } from './entity/reservation-accommodation.entity';

@Injectable()
export class ReservationAccommodationService {
  constructor(
    @InjectRepository(ReservationAccommodation)
    private reservationAccommodationRepo: Repository<ReservationAccommodation>,
  ) {}

  async create(
    reservation: Reservation,
    accommodation: Accommodation,
  ): Promise<ReservationAccommodation> {
    try {
      const reservationAccommodation = this.reservationAccommodationRepo.create(
        {
          reservation,
          accommodation,
        },
      );
      await this.reservationAccommodationRepo.save(reservationAccommodation);
      return reservationAccommodation;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async deleteByReservationId(id: number) {
    return await this.reservationAccommodationRepo
      .createQueryBuilder()
      .delete()
      .from(ReservationAccommodation)
      .where('reservation.id = :id', { id })
      .execute();
  }
}
