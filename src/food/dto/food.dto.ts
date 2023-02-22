import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class FoodDto {
  @ApiProperty()
  @IsString()
  @MinLength(3, {
    message: 'Name is too short',
  })
  @MaxLength(20, {
    message: 'Name is too long',
  })
  name: string;
}
