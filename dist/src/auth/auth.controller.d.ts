import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    login(loginData: LoginDto, user: any): Promise<{
        access_token: string;
    }>;
    getUser(userId: any): Promise<{
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
}
