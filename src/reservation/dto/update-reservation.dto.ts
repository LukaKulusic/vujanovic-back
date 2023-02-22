import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Dto } from './dto';

export class UpdateReservationDto {
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

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  dateFrom: Date;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  dateTo: Date;

  @ApiProperty({ type: 'integer', isArray: true })
  @IsOptional()
  programs: number[];

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => Dto)
  country: Dto;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => Dto)
  accommodation: Dto;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => Dto)
  food: Dto;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => Dto)
  payment: Dto;
}
