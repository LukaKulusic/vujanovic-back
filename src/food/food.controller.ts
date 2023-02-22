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
import { FoodDto } from './dto/food.dto';
import { UserRoles } from 'src/user/entity/enum/roles.enum';
import { Roles } from 'src/user/roles.decorator';
import { FoodService } from './food.service';
import { GetManyDto } from 'src/user/dto/get-many-user.dto';
import { UpdateManyFoodDto } from './dto/update-many-food.dto';
@ApiTags('Food')
@ApiBearerAuth()
@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  async getList(@Req() req: Request) {
    return await this.foodService.getList(req.query);
  }

  @Get('/:id')
  getById(@Param('id') id: number) {
    const food = this.foodService.getOne(id);
    if (food) {
      return food;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
  @Post('getMany')
  getMany(@Body() body: GetManyDto) {
    const { ids } = body;
    const result = this.foodService.getMany(ids);
    if (result) {
      return result;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('/:id')
  @Roles(UserRoles.ADMIN)
  update(@Param('id') id: number, @Body() body: FoodDto) {
    const updatedFood = this.foodService.update(id, body);
    if (updatedFood) {
      return updatedFood;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('updateMany')
  @Roles(UserRoles.ADMIN)
  updateMany(@Body() body: UpdateManyFoodDto) {
    const updatedFood = this.foodService.updateMany(body.updateData);
    if (updatedFood) {
      return updatedFood;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @Roles(UserRoles.ADMIN)
  async create(@Body() body: FoodDto) {
    const food = this.foodService.create(body);
    if (food) {
      return food;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id')
  @Roles(UserRoles.ADMIN)
  deleteUser(@Param('id') id: number) {
    return this.foodService.delete(id);
  }
  @Post('deleteMany')
  @Roles(UserRoles.ADMIN)
  async deleteMany(@Body() body: GetManyDto) {
    const { ids } = body;
    return await this.foodService.deleteMany(ids);
  }
}
