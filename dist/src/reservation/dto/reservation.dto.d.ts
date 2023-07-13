import { ReservationDescriptionDto } from "./description.dto";
import { Dto } from "./dto";
export declare class ReservationDto {
    name: string;
    contact: string;
    paymentDetails: string;
    desc: string;
    personNumber: number;
    veganNumber: number;
    vegetarianNumber: number;
    glutenFreeNumber: number;
    dateFrom: Date;
    dateTo: Date;
    country: Dto;
    accommodations: number[];
    payment: Dto;
    description: ReservationDescriptionDto[];
}
