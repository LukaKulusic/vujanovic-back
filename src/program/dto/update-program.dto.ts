import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";
import { ProgramTypeDto } from "./program-type.dto";

export class UpdateProgramDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1, {
    message: " Title is too short",
  })
  @MaxLength(40, {
    message: "Title is too long",
  })
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(5, {
    message: "Description is too short",
  })
  description: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsNumber()
  // @Min(1)
  // @Max(2)
  // type: number;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => ProgramTypeDto)
  type: ProgramTypeDto;
}
