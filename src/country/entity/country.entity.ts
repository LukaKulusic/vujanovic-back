import { Reservation } from 'src/reservation/entity/reservation.entity';
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
@Entity('country')
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @OneToMany(() => Reservation, (reservation) => reservation.country, {
    onDelete: 'SET NULL',
  })
  reservations: Reservation[];
}
