import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsDate,
  IsString,
  IsNumber,
  IsOptional,
  MinLength,
  ValidateNested,
  IsDateString,
} from "class-validator";
import { ReservationDescriptionDto } from "./description.dto";
import { Dto } from "./dto";

export class ReservationDto {
  @ApiProperty()
  @IsString()
  @MinLength(3, {
    message: "Name is too short",
  })
  name: string;

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

  @ApiProperty()
  @IsNumber()
  personNumber: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  veganNumber: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  vegetarianNumber: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  glutenFreeNumber: number;

  @ApiProperty()
  @IsDateString()
  // @Type(() => Date)
  dateFrom: Date;

  @ApiProperty()
  @IsDateString()
  // @Type(() => Date)
  dateTo: Date;

  // @IsOptional()
  // @ApiProperty({ type: 'integer', isArray: true })
  // programs: number[];

  @IsOptional()
  @ApiProperty()
  @ValidateNested()
  @Type(() => Dto)
  country: Dto;

  @IsOptional()
  @ApiProperty({ type: "integer", isArray: true })
  accommodations: number[];

  @IsOptional()
  @ApiProperty()
  @ValidateNested()
  @Type(() => Dto)
  payment: Dto;

  @IsOptional()
  @ApiProperty({
    isArray: true,
    type: ReservationDescriptionDto,
  })
  description: ReservationDescriptionDto[];
}
