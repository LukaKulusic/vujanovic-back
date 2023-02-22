import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationProgram } from './entity/reservation-program.entity';
import { ReservationProgramService } from './reservation-program.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationProgram])],
  providers: [ReservationProgramService],
  exports: [ReservationProgramService],
})
export class ReservationProgramModule {}
