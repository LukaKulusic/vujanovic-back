import { UserRoles } from '../../user/entity/enum/roles.enum';
export interface JwtPayload {
    id: number;
    username: string;
    role: UserRoles;
}
