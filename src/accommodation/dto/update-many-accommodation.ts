import { ApiProperty } from '@nestjs/swagger';
import { UpdateAccommodationDto } from './update-accommodation.dto';

export class UpdateManyAccommodationDto {
  @ApiProperty({ isArray: true, type: UpdateAccommodationDto })
  updateData: UpdateAccommodationDto[];
}
