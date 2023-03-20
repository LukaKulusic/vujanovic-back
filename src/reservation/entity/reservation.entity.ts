import { Country } from "src/country/entity/country.entity";
import { Food } from "src/food/entity/food.entity";
import { Payment } from "src/payment/entity/payment.entity";
import { ReservationAccommodation } from "src/reservation-accommodation/entity/reservation-accommodation.entity";
import { ReservationDescription } from "src/reservation-description/entity/reservation-description.entity";
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";

@Entity("reservation")
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  contact: string;

  @Column({ type: "timestamp" })
  dateFrom: Date;

  @Column({ type: "timestamp" })
  dateTo: Date;

  @Column()
  personNumber: number;

  @Column({ default: 0 })
  veganNumber: number;

  @Column({ default: 0 })
  vegetarianNumber: number;

  @Column("text", { nullable: true })
  paymentDetails: string;

  @Column("text", { nullable: true })
  desc: string;

  @CreateDateColumn({ type: "timestamp", select: false })
  createdDate: Date;

  @UpdateDateColumn({ type: "timestamp", select: false })
  updatedDate: Date;

  // @OneToMany(
  //   () => ReservationProgram,
  //   (programToReservation) => programToReservation.reservation,
  //   { cascade: true, eager: true },
  // )
  // programsToReservation: ReservationProgram[];

  // @ManyToOne(() => Food, (food) => food.reservations, {
  //   nullable: true,
  // })
  // food: Food;

  // ONE TO MANY

  @OneToMany(
    () => ReservationAccommodation,
    (accommodationToReservation) => accommodationToReservation.reservation,
    { cascade: true, eager: true }
  )
  accommodationsToReservation: ReservationAccommodation[];

  @OneToMany(
    () => ReservationDescription,
    (description) => description.reservation,
    {
      onDelete: "SET NULL",
    }
  )
  descriptions: ReservationDescription[];

  //MANY TO ONE

  @ManyToOne(() => Country, (country) => country.reservations, {
    nullable: true,
  })
  country: Country;

  @ManyToOne(() => Payment, (payment) => payment.reservations, {
    nullable: true,
  })
  payment: Payment;
}
