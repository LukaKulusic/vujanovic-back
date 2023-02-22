import { Accommodation } from 'src/accommodation/entity/accommodation.entity';
import { Country } from 'src/country/entity/country.entity';
import { Food } from 'src/food/entity/food.entity';
import { Payment } from 'src/payment/entity/payment.entity';
import { ReservationProgram } from 'src/reservation-program/entity/reservation-program.entity';
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity('reservation')
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Country, (country) => country.reservations, {
    nullable: true,
  })
  country: Country;

  @Column()
  personNumber: number;

  @Column({ default: 0 })
  veganNumber: number;

  @Column({ type: 'timestamp' })
  dateFrom: Date;

  @Column({ type: 'timestamp' })
  dateTo: Date;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedDate: Date;

  @OneToMany(
    () => ReservationProgram,
    (programToReservation) => programToReservation.reservation,
    { cascade: true, eager: true },
  )
  programsToReservation: ReservationProgram[];

  @ManyToOne(() => Food, (food) => food.reservations, {
    nullable: true,
  })
  food: Food;

  @ManyToOne(
    () => Accommodation,
    (accommodation) => accommodation.reservations,
    {
      nullable: true,
    },
  )
  accommodation: Accommodation;

  @ManyToOne(() => Payment, (payment) => payment.reservations, {
    nullable: true,
  })
  payment: Payment;
}
