import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class DescriptionProgramDto {
  @ApiProperty()
  @IsNumber()
  programId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  programPersonNumber: number;
}
