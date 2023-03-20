import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class Dto {
  @ApiProperty()
  @IsNumber()
  id: number;
}

export class UpdateDto {
  @ApiProperty()
  id: number | null;
}
