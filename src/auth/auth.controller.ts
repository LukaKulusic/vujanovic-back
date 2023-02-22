import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
// import { RefreshTokenGuard } from './guard/refresh-token.guard';
import { Public } from './decorator/public.decorator';
import { GetCurrentUser } from './decorator/get-current-user.decorator';
import { GetCurrentUserId } from './decorator/get-current-user-id.decorator';
import { LocalAuthGuard } from './guard/local.guard';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() loginData: LoginDto, @GetCurrentUser() user: any) {
    return this.authService.login(user);
  }

  @Get('/me')
  async getUser(@GetCurrentUserId() userId) {
    return await this.userService.getOne(userId);
  }
}
