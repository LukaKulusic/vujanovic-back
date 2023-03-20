import { Accommodation } from 'src/accommodation/entity/accommodation.entity';
import { Food } from 'src/food/entity/food.entity';
import { ReservationDescription } from 'src/reservation-description/entity/reservation-description.entity';
import { Reservation } from 'src/reservation/entity/reservation.entity';
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
@Entity('reservation_description_food')
export class ReservationDescriptionFood extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(
    () => ReservationDescription,
    (description) => description.foodToDescriptions,
    {
      onDelete: 'SET NULL',
    },
  )
  description: ReservationDescription;

  @ManyToOne(() => Food, (food) => food.foodToDescriptions, {
    onDelete: 'SET NULL',
  })
  food: Food;
}
