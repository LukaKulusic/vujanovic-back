import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";
import { ProgramType } from "../entity/enum/program.enum";
import { ProgramTypeDto } from "./program-type.dto";

export class ProgramDto {
  @ApiProperty()
  @IsString()
  @MinLength(1, {
    message: "Title is too short",
  })
  @MaxLength(40, {
    message: "Title is too long",
  })
  title: string;

  @ApiProperty()
  @IsString()
  @MinLength(5, {
    message: "Description is too short",
  })
  description: string;

  //   @ApiProperty()
  //   @IsNumber()
  //   @Min(1)
  //   @Max(2)
  //   type: number;

  @ApiProperty()
  @ValidateNested()
  @Type(() => ProgramTypeDto)
  type: ProgramTypeDto;
}
// }
