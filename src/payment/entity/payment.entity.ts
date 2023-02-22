import { Reservation } from 'src/reservation/entity/reservation.entity';
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('payment')
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  type: string;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedDate: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.payment, {
    onDelete: 'SET NULL',
  })
  reservations: Reservation[];
}
