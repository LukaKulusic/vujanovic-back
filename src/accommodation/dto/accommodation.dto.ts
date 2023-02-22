import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AccommodationDto {
  @ApiProperty()
  @IsString()
  name: string;
}
