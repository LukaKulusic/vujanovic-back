import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsDateString, ValidateNested } from "class-validator";
import { DescriptionProgramDto } from "./description-program.dto";
import { DescriptionFoodDto } from "./description-food.dto";

export class ReservationDescriptionDto {
  @ApiProperty()
  @IsDateString()
  date: Date;

  @IsOptional()
  @ApiProperty()
  @ValidateNested()
  @Type(() => DescriptionFoodDto)
  foodDescription: DescriptionFoodDto[];

  @IsOptional()
  @ApiProperty()
  @ValidateNested()
  @Type(() => DescriptionProgramDto)
  programDescription: DescriptionProgramDto[];
}
