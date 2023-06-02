import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsDate,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from "class-validator";
import { ReservationDescriptionDto } from "./description.dto";
import { Dto, UpdateDto } from "./dto";

export class UpdateReservationDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3, {
    message: "Name is too short",
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
  @IsNumber()
  vegetarianNumber: number;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  dateFrom: Date;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  dateTo: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  contact: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  paymentDetails: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  desc: string;

  // @ApiProperty({ type: 'integer', isArray: true })
  // @IsOptional()
  // programs: number[];

  @ApiProperty()
  @IsOptional()
  // @ValidateNested()
  @Type(() => UpdateDto)
  country: UpdateDto;

  @IsOptional()
  @ApiProperty({ type: "integer", isArray: true })
  accommodations: number[];

  // @ApiProperty()
  // @IsOptional()
  // @ValidateNested()
  // @Type(() => Dto)
  // food: Dto;

  @ApiProperty()
  @IsOptional()
  // @ValidateNested()
  @Type(() => UpdateDto)
  payment: UpdateDto;

  @IsOptional()
  @ApiProperty({
    isArray: true,
    type: ReservationDescriptionDto,
  })
  description: ReservationDescriptionDto[];
}
