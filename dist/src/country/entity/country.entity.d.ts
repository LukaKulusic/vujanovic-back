import { Reservation } from 'src/reservation/entity/reservation.entity';
import { BaseEntity } from 'typeorm';
export declare class Country extends BaseEntity {
    id: number;
    name: string;
    code: string;
    reservations: Reservation[];
}
