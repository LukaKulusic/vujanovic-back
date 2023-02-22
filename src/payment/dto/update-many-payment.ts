import { ApiProperty } from '@nestjs/swagger';
import { UpdatePaymentDto } from './update-payment.dto';

export class UpdateManyPaymentDto {
  @ApiProperty({ isArray: true, type: UpdatePaymentDto })
  updateData: UpdatePaymentDto[];
}
