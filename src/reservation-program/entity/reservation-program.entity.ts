import { Program } from 'src/program/entity/program.entity';
import { Reservation } from 'src/reservation/entity/reservation.entity';
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
@Entity('reservation_program')
export class ReservationProgram extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(
    () => Reservation,
    (reservation) => reservation.programsToReservation,
    {
      onDelete: 'SET NULL',
    },
  )
  reservation: Reservation;

  @ManyToOne(() => Program, (program) => program.programsToReservation, {
    onDelete: 'SET NULL',
  })
  program: Program;
}
