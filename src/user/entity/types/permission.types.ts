import {
  UserPermission,
  AccommodationPermission,
  PaymentPermission,
  ProgramPermission,
  FoodPermission,
  ReservationPermission,
} from '../enum/permisson.enum';

const Permission = {
  ...UserPermission,
  ...AccommodationPermission,
  ...PaymentPermission,
  ...ProgramPermission,
  ...FoodPermission,
  ...ReservationPermission,
};

type Permission =
  | UserPermission
  | AccommodationPermission
  | PaymentPermission
  | ProgramPermission
  | FoodPermission
  | ReservationPermission;
export default Permission;
