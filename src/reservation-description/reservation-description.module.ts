import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from 'src/food/entity/food.entity';
import { FoodModule } from 'src/food/food.module';
import { FoodService } from 'src/food/food.service';
import { Program } from 'src/program/entity/program.entity';
import { ProgramModule } from 'src/program/program.module';
import { ProgramService } from 'src/program/program.service';
import { ReservationDescriptionFood } from 'src/reservation-description-food/entity/reservation-description-food.entity';
import { ReservationDescriptionFoodService } from 'src/reservation-description-food/reservation-description-food.service';
import { ReservationDescriptionFoodModule } from 'src/reservation-description-food/reservation-description-food.module';
import { ReservationDescriptionProgram } from 'src/reservation-description-program/entity/reservation-description-program.entity';
import { ReservationDescriptionProgramModule } from 'src/reservation-description-program/reservation-description-program.module';
import { ReservationDescriptionProgramService } from 'src/reservation-description-program/reservation-description-program.service';
import { ReservationDescription } from './entity/reservation-description.entity';
import { ReservationDescriptionService } from './reservation-description.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReservationDescription,
      ReservationDescriptionFood,
      ReservationDescriptionProgram,
      Food,
      Program,
    ]),
    FoodModule,
    ProgramModule,
    ReservationDescriptionProgramModule,
    ReservationDescriptionFoodModule,
  ],
  providers: [
    ReservationDescriptionService,
    FoodService,
    ProgramService,
    ReservationDescriptionFoodService,
    ReservationDescriptionProgramService,
  ],
  exports: [ReservationDescriptionService],
})
export class ReservationDescriptionModule {}
