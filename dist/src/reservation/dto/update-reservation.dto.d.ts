import { Dto } from './dto';
export declare class UpdateReservationDto {
    name: string;
    personNumber: number;
    veganNumber: number;
    dateFrom: Date;
    dateTo: Date;
    programs: number[];
    country: Dto;
    accommodation: Dto;
    food: Dto;
    payment: Dto;
}
