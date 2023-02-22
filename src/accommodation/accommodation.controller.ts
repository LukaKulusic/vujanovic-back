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
import { Public } from '../auth/decorator/public.decorator';
import { AccommodationDto } from './dto/accommodation.dto';
import { UpdateAccommodationDto } from './dto/update-accommodation.dto';
import { UserRoles } from 'src/user/entity/enum/roles.enum';
import { Roles } from 'src/user/roles.decorator';
import { AccommodationService } from './accommodation.service';
import { GetManyDto } from 'src/user/dto/get-many-user.dto';
import { UpdateManyAccommodationDto } from './dto/update-many-accommodation';
@ApiTags('Accommodation')
@ApiBearerAuth()
@Controller('accommodation')
export class AccommodationController {
  constructor(private readonly accommodationService: AccommodationService) {}

  @Get()
  async getAll(@Req() req: Request) {
    return await this.accommodationService.getList(req.query);
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    const accommodation = await this.accommodationService.getOne(id);
    if (accommodation) {
      return accommodation;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
  @Post('getMany')
  getMany(@Body() body: GetManyDto) {
    const { ids } = body;
    const result = this.accommodationService.getMany(ids);
    if (result) {
      return result;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('/:id')
  @Roles(UserRoles.ADMIN)
  async update(@Param('id') id: number, @Body() body: AccommodationDto) {
    const updatedAccommodation = await this.accommodationService.update(
      id,
      body,
    );
    if (updatedAccommodation) {
      return updatedAccommodation;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
  @Post('updateMany')
  @Roles(UserRoles.ADMIN)
  updateMany(@Body() body: UpdateManyAccommodationDto) {
    const updatedAccommodation = this.accommodationService.updateMany(
      body.updateData,
    );
    if (updatedAccommodation) {
      return updatedAccommodation;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @Roles(UserRoles.ADMIN)
  async create(@Body() body: AccommodationDto) {
    const accommodation = await this.accommodationService.create(body);
    if (accommodation) {
      return accommodation;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id')
  @Roles(UserRoles.ADMIN)
  async deleteUser(@Param('id') id: number) {
    return await this.accommodationService.delete(id);
  }
  @Post('deleteMany')
  @Roles(UserRoles.ADMIN)
  async deleteMany(@Body() body: GetManyDto) {
    const { ids } = body;
    return await this.accommodationService.deleteMany(ids);
  }
}
