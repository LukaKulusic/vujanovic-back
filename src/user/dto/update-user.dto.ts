import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsNumber,
  MinLength,
  MaxLength,
  Min,
  Max,
  ValidateNested,
  IsEmail,
} from 'class-validator';

import { UserRoles } from '../entity/enum/roles.enum';
import { RoleDto } from './role.dto';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
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
  @MinLength(5, {
    message: 'Email is too short',
  })
  @IsOptional()
  email: string;

  // @ApiProperty({ enum: [Object.values(UserRoles)] })
  // @IsString()
  // @IsOptional()
  // role: UserRoles;
  // @ApiProperty()
  // @IsNumber()
  // @Min(1)
  // @Max(5)
  // @IsOptional()
  // role: number;
  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => RoleDto)
  role: RoleDto;
}
