import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDateString } from 'class-validator';

export class ReportByCashDto {
  @ApiProperty()
  @IsDateString()
  dateFrom: Date;

  @ApiProperty()
  @IsDateString()
  dateTo: Date;

  @ApiProperty()
  @IsNumber()
  payment: number;
}
