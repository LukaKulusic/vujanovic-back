import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class Dto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  id: number;
}

export class UpdateDto {
  @ApiProperty()
  id: number | null;
}
