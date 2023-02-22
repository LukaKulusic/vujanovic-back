import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { Roles } from './roles.decorator';
import { UserRoles } from './entity/enum/roles.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateManyUserDto } from './dto/update-many-user.dto';
import { GetManyDto } from './dto/get-many-user.dto';
import { GetCurrentUserId } from 'src/auth/decorator/get-current-user-id.decorator';
@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(UserRoles.ADMIN)
  async getList(@Req() req: Request) {
    return await this.userService.getList(req.query);
  }

  @Get('/:id')
  @Roles(UserRoles.ADMIN)
  getUserById(@Param('id') id: number) {
    const user = this.userService.getOne(id);
    if (user) {
      return user;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('getMany')
  @Roles(UserRoles.ADMIN)
  getMany(@Body() body: GetManyDto) {
    const { ids } = body;
    const result = this.userService.getMany(ids);
    if (result) {
      return result;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('/:id')
  @Roles(UserRoles.ADMIN)
  updateUser(@Param('id') id: number, @Body() body: UpdateUserDto) {
    const updatedUser = this.userService.update(id, body);
    if (updatedUser) {
      return updatedUser;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
  @Post('updateMany')
  @Roles(UserRoles.ADMIN)
  updateMany(@Body() body: UpdateManyUserDto) {
    const updatedUsers = this.userService.updateMany(body.updateData);
    if (updatedUsers) {
      return updatedUsers;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @Roles(UserRoles.ADMIN)
  async createUser(@Body() body: UserDto) {
    const user = this.userService.create(body);
    if (user) {
      return user;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id')
  @Roles(UserRoles.ADMIN)
  async deleteUser(
    @Param('id') id: number,
    @GetCurrentUserId() userId: number,
  ) {
    if (id == userId) {
      throw new HttpException(
        'Can not delete yourself!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.userService.delete(id);
  }
  @Post('deleteMany')
  @Roles(UserRoles.ADMIN)
  async deleteMany(
    @Body() body: GetManyDto,
    @GetCurrentUserId() userId: number,
  ) {
    const { ids } = body;
    let array = ids;
    if (ids.includes(userId)) {
      array = ids.filter((item) => item != userId);
    }
    return await this.userService.deleteMany(array);
  }
}
