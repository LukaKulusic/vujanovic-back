import { Exclude } from 'class-transformer';
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

@Entity('food')
export class Food extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp', select: false })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp', select: false })
  updatedDate: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.food, {
    onDelete: 'SET NULL',
  })
  reservations: Reservation[];
}
