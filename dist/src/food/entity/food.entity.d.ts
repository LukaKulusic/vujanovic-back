import { ReservationDescriptionFood } from 'src/reservation-description-food/entity/reservation-description-food.entity';
import { BaseEntity } from 'typeorm';
export declare class Food extends BaseEntity {
    id: number;
    name: string;
    createdDate: Date;
    updatedDate: Date;
    foodToDescriptions: ReservationDescriptionFood[];
}
