import { Repository } from 'typeorm';
import { PaymentDto } from './dto/payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entity/payment.entity';
export declare class PaymentService {
    private paymentRepo;
    constructor(paymentRepo: Repository<Payment>);
    getList(query: any): Promise<{
        data: Payment[];
        total: number;
    }>;
    getMany(ids: Array<number>): Promise<{
        data: Payment[];
    }>;
    getOne(id: number): Promise<{
        data: Payment;
    }>;
    findAll(): Promise<Payment[]>;
    findOne(id: number): Promise<Payment>;
    findOneByType(type: string): Promise<Payment>;
    create(body: PaymentDto): Promise<{
        data: Payment;
    }>;
    update(id: number, body: PaymentDto): Promise<{
        data: Payment;
    }>;
    updateMany(body: UpdatePaymentDto[]): Promise<{
        data: any[];
    }>;
    delete(id: number): Promise<{
        data: number[];
    }>;
    deleteMany(ids: Array<number>): Promise<{
        data: number[];
    }>;
}
