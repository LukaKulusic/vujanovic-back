import { ReservationAccommodation } from 'src/reservation-accommodation/entity/reservation-accommodation.entity';
import { BaseEntity } from 'typeorm';
export declare class Accommodation extends BaseEntity {
    id: number;
    name: string;
    createdDate: Date;
    updatedDate: Date;
    accommodationsToReservation: ReservationAccommodation[];
}
