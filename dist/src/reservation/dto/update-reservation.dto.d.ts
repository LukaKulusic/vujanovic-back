import { ReservationDescriptionDto } from "./description.dto";
import { UpdateDto } from "./dto";
export declare class UpdateReservationDto {
    name: string;
    personNumber: number;
    veganNumber: number;
    vegetarianNumber: number;
    glutenFreeNumber: number;
    dateFrom: Date;
    dateTo: Date;
    contact: string;
    paymentDetails: string;
    desc: string;
    country: UpdateDto;
    accommodations: number[];
    payment: UpdateDto;
    description: ReservationDescriptionDto[];
}
