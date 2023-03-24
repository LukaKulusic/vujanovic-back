import { ReservationDescriptionFood } from "src/reservation-description-food/entity/reservation-description-food.entity";
import { ReservationDescriptionProgram } from "src/reservation-description-program/entity/reservation-description-program.entity";
import { Reservation } from "src/reservation/entity/reservation.entity";
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
@Entity("reservation_description")
export class ReservationDescription extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "timestamp" })
  date: Date;

  @ManyToOne(() => Reservation, (reservation) => reservation.descriptions, {
    nullable: true,
    onDelete: "CASCADE",
  })
  reservation: Reservation;

  //pivot description food

  @OneToMany(
    () => ReservationDescriptionFood,
    (foodToDescription) => foodToDescription.description,
    { cascade: true, eager: true }
  )
  foodToDescriptions: ReservationDescriptionFood[];
  //pivot description program

  @OneToMany(
    () => ReservationDescriptionProgram,
    (programToDescription) => programToDescription.description,
    { cascade: true, eager: true }
  )
  programsToDescriptions: ReservationDescriptionProgram[];
}
