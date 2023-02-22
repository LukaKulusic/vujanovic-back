import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class ProgramTypeDto {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(2)
  id: number;
}
