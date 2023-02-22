import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UpdateUsersDto } from './dto/update-many-users.dto';
export declare class UserService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    getList(query: any): Promise<{
        data: {
            id: number;
            name: string;
            username: string;
            password: string;
            email: string;
            createdDate: Date;
            updatedDate: Date;
        }[];
        total: number;
    }>;
    getMany(ids: Array<number>): Promise<{
        data: User[];
    }>;
    getOne(id: number): Promise<{
        data: {
            id: number;
            name: string;
            username: string;
            password: string;
            email: string;
            createdDate: Date;
            updatedDate: Date;
        };
    }>;
    findOne(id: number): Promise<User>;
    findWithRole(): Promise<User[]>;
    findOneByUsername(username: string): Promise<User>;
    create(body: UserDto): Promise<Record<string, unknown> | undefined>;
    update(id: number, body: UpdateUserDto): Promise<{
        data: {
            id: number;
            name: string;
            username: string;
            password: string;
            email: string;
            createdDate: Date;
            updatedDate: Date;
        };
    }>;
    updateMany(body: UpdateUsersDto[]): Promise<{
        data: any[][];
    }>;
    delete(id: number): Promise<{
        data: number[];
    }>;
    deleteMany(ids: Array<number>): Promise<{
        data: number[];
    }>;
}
