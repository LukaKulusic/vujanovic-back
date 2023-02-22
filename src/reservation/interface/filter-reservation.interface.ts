export interface IFilterReservationQuery {
  fromDate?: Date;
  toDate?: Date;
  food?: Array<number>;
  accommodation?: Array<number>;
  program?: Array<number>;
  country?: Array<number>;
}
