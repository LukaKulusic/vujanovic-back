import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class DescriptionFoodDto {
  @ApiProperty()
  @IsNumber()
  foodId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  foodPersonNumber: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  foodVeganNumber: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  foodVegetarianNumber: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  foodGlutenFreeNumber: number;
}
