import { Reservation } from 'src/reservation/entity/reservation.entity';
import { BaseEntity } from 'typeorm';
export declare class Payment extends BaseEntity {
    id: number;
    type: string;
    createdDate: Date;
    updatedDate: Date;
    reservations: Reservation[];
}
