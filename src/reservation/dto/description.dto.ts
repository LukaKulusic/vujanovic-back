import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsDateString } from "class-validator";
export class ReservationDescriptionDto {
  @ApiProperty()
  @IsDateString()
  date: Date;

  @IsOptional()
  @ApiProperty({ type: "integer", isArray: true })
  foodIds: number[];

  @IsOptional()
  @ApiProperty({ type: "integer", isArray: true })
  programIds: number[];
}
