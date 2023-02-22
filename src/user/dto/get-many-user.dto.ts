import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray } from 'class-validator';

export class GetManyDto {
  @ApiProperty()
  @IsNumber({}, { each: true })
  ids: number[];
}
