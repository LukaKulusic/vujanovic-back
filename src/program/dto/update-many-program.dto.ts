import { ApiProperty } from '@nestjs/swagger';
import { UpdateProgramsDto } from './update-programs.dto';

export class UpdateManyProgramDto {
  @ApiProperty({ isArray: true, type: UpdateProgramsDto })
  updateData: UpdateProgramsDto[];
}
