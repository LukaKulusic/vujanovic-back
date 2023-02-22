import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDateString } from 'class-validator';

export class ReportByCountryDto {
  @ApiProperty()
  @IsDateString()
  dateFrom: Date;

  @ApiProperty()
  @IsDateString()
  dateTo: Date;

  @ApiProperty()
  @IsNumber()
  program: number;
}
