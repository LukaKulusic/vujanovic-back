import { ApiProperty } from "@nestjs/swagger";
import {
  IsOptional,
  IsString,
  IsNumber,
  MinLength,
  MaxLength,
  Min,
  Max,
} from "class-validator";

export class UpdateProgramsDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(1, {
    message: "Title is too short",
  })
  @MaxLength(40, {
    message: "Title is too long",
  })
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(3, {
    message: "Description is too short",
  })
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(2)
  type: number;
}
