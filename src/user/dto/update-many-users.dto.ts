import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  MinLength,
  MaxLength,
  Min,
  Max,
  IsEmail,
} from 'class-validator';

import { UserRoles } from '../entity/enum/roles.enum';

export class UpdateUsersDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(3, {
    message: 'Name is too short',
  })
  @MaxLength(20, {
    message: 'Name is too long',
  })
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(3, {
    message: 'Username is too short',
  })
  @MaxLength(20, {
    message: 'Username is too long',
  })
  @IsOptional()
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  @MinLength(8, {
    message: 'Email is too short',
  })
  @MaxLength(14, {
    message: 'Email is too long',
  })
  @IsOptional()
  email: string;

  // @ApiProperty({ enum: [Object.values(UserRoles)] })
  // @IsString()
  // @IsOptional()
  // role: UserRoles;
  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  role: number;
}
