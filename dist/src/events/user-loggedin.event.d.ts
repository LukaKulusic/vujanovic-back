import { UserRoles } from 'src/user/entity/enum/roles.enum';
export declare class UserLoggedInEvent {
    readonly userId: string;
    readonly role: UserRoles;
    constructor(userId: string, role: UserRoles);
}
