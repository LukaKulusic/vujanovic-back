import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class DescriptionFoodDto {
  @ApiProperty()
  @IsNumber()
  foodId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  personNumber: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  veganNumber: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  vegetarianNumber: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  glutenFreeNumber: number;
}
