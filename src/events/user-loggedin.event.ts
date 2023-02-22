import { UserRoles } from 'src/user/entity/enum/roles.enum';
export class UserLoggedInEvent {
  constructor(
    public readonly userId: string,
    public readonly role: UserRoles,
  ) {}
}
