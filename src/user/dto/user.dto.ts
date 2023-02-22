import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { UserRoles } from '../entity/enum/roles.enum';
import { RoleDto } from './role.dto';

export class UserDto {
  @ApiProperty()
  @IsString()
  @MinLength(3, {
    message: 'Name is too short',
  })
  @MaxLength(20, {
    message: 'Name is too long',
  })
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(3, {
    message: 'Username is too short',
  })
  @MaxLength(20, {
    message: 'Username is too long',
  })
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(8, {
    message: 'Password is too short',
  })
  password: string;

  @ApiProperty()
  @IsEmail()
  @MinLength(5, {
    message: 'Email is too short',
  })
  email: string;

  // @ApiProperty({ enum: [Object.values(UserRoles)] })
  // @IsString()
  // @IsOptional()
  // role: UserRoles;
  // @ApiProperty()
  // @IsNumber()
  // @Min(1)
  // @Max(5)
  // role: number;

  @ApiProperty()
  @ValidateNested()
  @Type(() => RoleDto)
  role: RoleDto;
}
