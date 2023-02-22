import { Request } from 'express';
import { GetManyDto } from 'src/user/dto/get-many-user.dto';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';
import { UpdateManyPaymentDto } from './dto/update-many-payment';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    getAll(req: Request): Promise<{
        data: import("./entity/payment.entity").Payment[];
        total: number;
    }>;
    getById(id: number): Promise<{
        data: import("./entity/payment.entity").Payment;
    }>;
    getMany(body: GetManyDto): Promise<{
        data: import("./entity/payment.entity").Payment[];
    }>;
    update(id: number, body: PaymentDto): Promise<{
        data: import("./entity/payment.entity").Payment;
    }>;
    updateMany(body: UpdateManyPaymentDto): Promise<{
        data: any[];
    }>;
    create(body: PaymentDto): Promise<{
        data: import("./entity/payment.entity").Payment;
    }>;
    deleteUser(id: number): Promise<{
        data: number[];
    }>;
    deleteMany(body: GetManyDto): Promise<{
        data: number[];
    }>;
}
