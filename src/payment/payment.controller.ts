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
import { UserRoles } from 'src/user/entity/enum/roles.enum';
import { Roles } from 'src/user/roles.decorator';
import { GetManyDto } from 'src/user/dto/get-many-user.dto';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';
import { UpdateManyPaymentDto } from './dto/update-many-payment';
@ApiTags('Payment')
@ApiBearerAuth()
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async getAll(@Req() req: Request) {
    return await this.paymentService.getList(req.query);
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    const payment = await this.paymentService.getOne(id);
    if (payment) {
      return payment;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
  @Post('getMany')
  getMany(@Body() body: GetManyDto) {
    const { ids } = body;
    const result = this.paymentService.getMany(ids);
    if (result) {
      return result;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('/:id')
  @Roles(UserRoles.ADMIN)
  async update(@Param('id') id: number, @Body() body: PaymentDto) {
    const updatedPayment = await this.paymentService.update(id, body);
    if (updatedPayment) {
      return updatedPayment;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
  @Post('updateMany')
  @Roles(UserRoles.ADMIN)
  updateMany(@Body() body: UpdateManyPaymentDto) {
    const updatedPayment = this.paymentService.updateMany(body.updateData);
    if (updatedPayment) {
      return updatedPayment;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @Roles(UserRoles.ADMIN)
  async create(@Body() body: PaymentDto) {
    const Payment = await this.paymentService.create(body);
    if (Payment) {
      return Payment;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id')
  @Roles(UserRoles.ADMIN)
  async deleteUser(@Param('id') id: number) {
    return await this.paymentService.delete(id);
  }
  @Post('deleteMany')
  @Roles(UserRoles.ADMIN)
  async deleteMany(@Body() body: GetManyDto) {
    const { ids } = body;
    return await this.paymentService.deleteMany(ids);
  }
}
