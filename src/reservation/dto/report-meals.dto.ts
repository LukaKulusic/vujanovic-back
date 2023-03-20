import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsDate,
  IsString,
  IsNumber,
  IsOptional,
  MinLength,
  MaxLength,
  ValidateNested,
  IsDateString,
} from "class-validator";
import { ReservationDescriptionDto } from "./description.dto";
import { Dto } from "./dto";

export class ReservationReportMealsDto {
  @ApiProperty()
  // @IsDate()
  date: Date;
}
