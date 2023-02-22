import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}
