import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationAccommodation } from './entity/reservation-accommodation.entity';
import { ReservationAccommodationService } from './reservation-accommodation.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationAccommodation])],
  providers: [ReservationAccommodationService],
  exports: [ReservationAccommodationService],
})
export class ReservationAccommodationModule {}
