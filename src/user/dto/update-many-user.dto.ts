import { ApiProperty } from '@nestjs/swagger';
import { UpdateUsersDto } from './update-many-users.dto';

export class UpdateManyUserDto {
  @ApiProperty({ isArray: true, type: UpdateUsersDto })
  updateData: UpdateUsersDto[];
}
