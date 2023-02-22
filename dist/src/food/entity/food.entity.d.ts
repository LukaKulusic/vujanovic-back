import { Reservation } from 'src/reservation/entity/reservation.entity';
import { BaseEntity } from 'typeorm';
export declare class Food extends BaseEntity {
    id: number;
    name: string;
    createdDate: Date;
    updatedDate: Date;
    reservations: Reservation[];
}
