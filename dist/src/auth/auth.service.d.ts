import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/user-jwt-payload.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserLoggedInEvent } from 'src/events/user-loggedin.event';
export declare class AuthService {
    private userService;
    private jwtService;
    private readonly eventEmitter;
    constructor(userService: UserService, jwtService: JwtService, eventEmitter: EventEmitter2);
    getTokens(payload: JwtPayload): Promise<{
        access_token: string;
    }>;
    validateUser(username: string, password: string): Promise<import("../user/entity/user.entity").User>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    loggedInUser(payload: UserLoggedInEvent): void;
}
