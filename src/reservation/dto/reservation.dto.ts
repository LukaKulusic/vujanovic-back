import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsString,
  IsNumber,
  IsOptional,
  MinLength,
  MaxLength,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { PaymentType } from '../entity/enum/payment-type.enum';
import { Dto } from './dto';

export class ReservationDto {
  @ApiProperty()
  @IsString()
  @MinLength(3, {
    message: 'Name is too short',
  })
  @MaxLength(20, {
    message: 'Name is too long',
  })
  name: string;

  @ApiProperty()
  @IsNumber()
  personNumber: number;

  @ApiProperty()
  @IsNumber()
  veganNumber: number;

  @ApiProperty()
  @IsDateString()
  // @Type(() => Date)
  dateFrom: Date;

  @ApiProperty()
  @IsDateString()
  // @Type(() => Date)
  dateTo: Date;

  @ApiProperty({ type: 'integer', isArray: true })
  programs: number[];

  @ApiProperty()
  @ValidateNested()
  @Type(() => Dto)
  country: Dto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Dto)
  accommodation: Dto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Dto)
  food: Dto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Dto)
  payment: Dto;
}
