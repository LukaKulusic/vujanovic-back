import { UserPermission, AccommodationPermission, PaymentPermission, ProgramPermission, FoodPermission, ReservationPermission } from '../enum/permisson.enum';
declare const Permission: {
    Reservation: ReservationPermission.Reservation;
    Food: FoodPermission.Food;
    Program: ProgramPermission.Program;
    Payment: PaymentPermission.Payment;
    Accommodation: AccommodationPermission.Accommodation;
    User: UserPermission.User;
};
declare type Permission = UserPermission | AccommodationPermission | PaymentPermission | ProgramPermission | FoodPermission | ReservationPermission;
export default Permission;
