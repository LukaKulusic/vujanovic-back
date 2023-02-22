import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  Scope,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/user-jwt-payload.interface';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UserLoggedInEvent } from 'src/events/user-loggedin.event';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getTokens(payload: JwtPayload) {
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: payload.id,
          username: payload.username,
          role: payload.role,
        },
        {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXP_TIME,
        },
      ),
    ]);
    return {
      access_token: accessToken,
    };
  }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneByUsername(username);
    if (!user)
      throw new HttpException(`User doesn't exist`, HttpStatus.BAD_REQUEST);

    const hashedPassword = user.password;

    const isValid = await bcrypt.compare(password, hashedPassword);
    if (!isValid)
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    user.password = undefined;
    return user;
  }
  async login(user: any) {
    const payload = {
      username: user.username,
      occupation: user.occupation,
      id: user.id,
      role: user.role,
    };
    const tokens = await this.getTokens(payload);

    return tokens;
  }
  @OnEvent('user.logged-in')
  loggedInUser(payload: UserLoggedInEvent) {
    console.log('Hello user ', payload);
  }
}
