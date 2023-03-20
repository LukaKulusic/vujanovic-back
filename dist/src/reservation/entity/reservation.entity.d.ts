import { Country } from "src/country/entity/country.entity";
import { Payment } from "src/payment/entity/payment.entity";
import { ReservationAccommodation } from "src/reservation-accommodation/entity/reservation-accommodation.entity";
import { ReservationDescription } from "src/reservation-description/entity/reservation-description.entity";
import { BaseEntity } from "typeorm";
export declare class Reservation extends BaseEntity {
    id: number;
    name: string;
    contact: string;
    dateFrom: Date;
    dateTo: Date;
    personNumber: number;
    veganNumber: number;
    vegetarianNumber: number;
    paymentDetails: string;
    desc: string;
    createdDate: Date;
    updatedDate: Date;
    accommodationsToReservation: ReservationAccommodation[];
    descriptions: ReservationDescription[];
    country: Country;
    payment: Payment;
}
