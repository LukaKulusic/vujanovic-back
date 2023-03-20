import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationDescriptionFood } from './entity/reservation-description-food.entity';
import { ReservationDescriptionFoodService } from './reservation-description-food.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationDescriptionFood])],
  providers: [ReservationDescriptionFoodService],
  exports: [ReservationDescriptionFoodService],
})
export class ReservationDescriptionFoodModule {}
