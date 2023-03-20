import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationDescriptionProgram } from './entity/reservation-description-program.entity';
import { ReservationDescriptionProgramService } from './reservation-description-program.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationDescriptionProgram])],
  providers: [ReservationDescriptionProgramService],
  exports: [ReservationDescriptionProgramService],
})
export class ReservationDescriptionProgramModule {}
