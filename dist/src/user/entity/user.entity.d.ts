import { BaseEntity } from 'typeorm';
import { UserRoles } from '../entity/enum/roles.enum';
export declare class User extends BaseEntity {
    id: number;
    name: string;
    username: string;
    password: string;
    email: string;
    role: UserRoles;
    createdDate: Date;
    updatedDate: Date;
    hashPassword(): Promise<void>;
}
