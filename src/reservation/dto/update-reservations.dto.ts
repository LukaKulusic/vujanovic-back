import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateReservationsDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3, {
    message: 'Name is too short',
  })
  @MaxLength(20, {
    message: 'Name is too long',
  })
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  personNumber: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  veganNumber: number;

  @IsOptional()
  @ApiProperty()
  @IsDate()
  dateFrom: Date;

  @IsOptional()
  @ApiProperty()
  @IsDate()
  dateTo: Date;

  @ApiProperty({ type: 'integer', isArray: true })
  @IsOptional()
  programs: number[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsOptional()
  countryCode: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  accommodation: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  food: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  payment: number;
}
