import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";
import { UserRoles } from "../entity/enum/roles.enum";

export class RoleDto {
  // @ApiProperty({ enum: [Object.values(UserRoles)] })
  // @IsString()
  // @IsOptional()
  // role: UserRoles;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(5)
  id: number;
}
