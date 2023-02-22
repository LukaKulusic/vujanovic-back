import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PaymentDto } from './dto/payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entity/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
  ) {}
  async getList(query) {
    const take = query._perPage || 10;
    const page = query._page || 1;
    const skip = (page - 1) * take;
    const keyword = query._q || '';
    let result = await this.paymentRepo.findAndCount({
      order: { id: query._sortOrder },
      where: { type: Like('%' + keyword + '%') },
      skip: skip,
      take: take,
      select: {
        id: true,
        type: true,
      },
    });

    return {
      data: result[0],
      total: result[1],
    };
  }
  async getMany(ids: Array<number>) {
    const result = await this.paymentRepo
      .createQueryBuilder('Payment')
      .where('accommodation.id IN (:...ids)', { ids: ids })
      .getMany();
    if (result) return { data: result };
  }
  async getOne(id: number) {
    const result = await this.paymentRepo.findOne({
      where: { id: id },
      select: {
        id: true,
        type: true,
      },
    });
    if (!result) {
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }
    return { data: result };
  }

  async findAll(): Promise<Payment[]> {
    const payment = await this.paymentRepo.find();
    return payment;
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepo.findOneBy({ id });
    if (!payment) {
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }
    return payment;
  }

  async findOneByType(type: string): Promise<Payment> {
    const Payment = await this.paymentRepo.findOne({
      where: { type },
    });
    return Payment;
  }

  async create(body: PaymentDto) {
    try {
      const { type } = body;
      const newPayment = this.paymentRepo.create({
        type,
      });
      const payment = await this.paymentRepo.save(newPayment);
      const result = await this.getOne(payment.id);
      return result;
    } catch (error) {
      throw new HttpException(
        `Bad request!${error.message} `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, body: PaymentDto) {
    const alreadyPayment = await this.paymentRepo.findOneBy({ id });
    if (alreadyPayment) {
      await this.paymentRepo.save(Object.assign(alreadyPayment, body));
      return await this.getOne(id);
    }
  }
  async updateMany(body: UpdatePaymentDto[]) {
    let result = [];

    for (let i = 0; i < body.length; i++) {
      const alreadyPayment = await this.paymentRepo.findOneBy({
        id: body[i].id,
      });
      if (alreadyPayment) {
        await this.paymentRepo.save(Object.assign(alreadyPayment, body[i]));

        result.push(await this.getOne(body[i].id));
      }
    }
    return { data: result };
  }

  async delete(id: number) {
    const result = await this.paymentRepo.delete(id);
    return { data: [result.affected] };
  }
  async deleteMany(ids: Array<number>) {
    const result = await this.paymentRepo
      .createQueryBuilder()
      .delete()
      .from(Payment)
      .where('id IN (:...ids)', { ids: ids })
      .execute();
    if (result) return { data: [result.affected] };
  }
}
