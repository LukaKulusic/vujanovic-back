import { Accommodation } from 'src/accommodation/entity/accommodation.entity';
import { Country } from 'src/country/entity/country.entity';
import { Food } from 'src/food/entity/food.entity';
import { Payment } from 'src/payment/entity/payment.entity';
import { ReservationProgram } from 'src/reservation-program/entity/reservation-program.entity';
import { BaseEntity } from 'typeorm';
export declare class Reservation extends BaseEntity {
    id: number;
    name: string;
    country: Country;
    personNumber: number;
    veganNumber: number;
    dateFrom: Date;
    dateTo: Date;
    createdDate: Date;
    updatedDate: Date;
    programsToReservation: ReservationProgram[];
    food: Food;
    accommodation: Accommodation;
    payment: Payment;
}
