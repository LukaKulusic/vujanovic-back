import { Program } from "src/program/entity/program.entity";
import { ReservationDescription } from "src/reservation-description/entity/reservation-description.entity";
import { Reservation } from "src/reservation/entity/reservation.entity";
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
@Entity("reservation_description_program")
export class ReservationDescriptionProgram extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ default: 0 })
  programPersonNumber: number;

  @ManyToOne(
    () => ReservationDescription,
    (description) => description.programsToDescriptions,
    {
      onDelete: "SET NULL",
    }
  )
  description: ReservationDescription;

  @ManyToOne(() => Program, (program) => program.programsToDescription, {
    onDelete: "SET NULL",
  })
  program: Program;
}
