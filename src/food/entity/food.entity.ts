import { ReservationDescriptionFood } from 'src/reservation-description-food/entity/reservation-description-food.entity';

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

  @OneToMany(
    () => ReservationDescriptionFood,
    (foodToDescription) => foodToDescription.food,
  )
  foodToDescriptions: ReservationDescriptionFood[];
}
