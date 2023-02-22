import { Request } from 'express';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateManyUserDto } from './dto/update-many-user.dto';
import { GetManyDto } from './dto/get-many-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getList(req: Request): Promise<{
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
    getUserById(id: number): Promise<{
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
    getMany(body: GetManyDto): Promise<{
        data: import("./entity/user.entity").User[];
    }>;
    updateUser(id: number, body: UpdateUserDto): Promise<{
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
    updateMany(body: UpdateManyUserDto): Promise<{
        data: any[][];
    }>;
    createUser(body: UserDto): Promise<Record<string, unknown>>;
    deleteUser(id: number, userId: number): Promise<{
        data: number[];
    }>;
    deleteMany(body: GetManyDto, userId: number): Promise<{
        data: number[];
    }>;
}
