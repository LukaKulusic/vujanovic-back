import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePaymentDto {
  @ApiProperty()
  @IsNumber()
  id: number;

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
