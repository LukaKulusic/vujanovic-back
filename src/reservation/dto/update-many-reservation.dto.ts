import { ApiProperty } from '@nestjs/swagger';
import { UpdateReservationsDto } from './update-reservations.dto';

export class UpdateManyReservationDto {
  @ApiProperty({ isArray: true, type: UpdateReservationsDto })
  updateData: UpdateReservationsDto[];
}
