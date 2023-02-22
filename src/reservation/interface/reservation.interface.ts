export interface ReservationPayload {
  id?: number;
  name: string;
  country: string;
  personNumber: number;
  veganNumber: number;
  dateFrom: Date;
  dateTo: Date;
  createdDate: Date;
  updatedDate: Date;
}
