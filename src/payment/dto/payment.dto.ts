import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class PaymentDto {
  @ApiProperty()
  @IsString()
  @MinLength(3, {
    message: 'Type is too short',
  })
  @MaxLength(10, {
    message: 'Type is too long',
  })
  type: string;
}
