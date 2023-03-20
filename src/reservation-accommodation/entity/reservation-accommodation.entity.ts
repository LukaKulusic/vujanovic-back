import { Accommodation } from 'src/accommodation/entity/accommodation.entity';
import { Reservation } from 'src/reservation/entity/reservation.entity';
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
@Entity('reservation_accommodation')
export class ReservationAccommodation extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(
    () => Reservation,
    (reservation) => reservation.accommodationsToReservation,
    {
      onDelete: 'SET NULL',
    },
  )
  reservation: Reservation;

  @ManyToOne(
    () => Accommodation,
    (accommodation) => accommodation.accommodationsToReservation,
    {
      onDelete: 'SET NULL',
    },
  )
  accommodation: Accommodation;
}
