import { ApiProperty } from '@nestjs/swagger';
import { UpdateFoodDto } from './update-food.dto';

export class UpdateManyFoodDto {
  @ApiProperty({ isArray: true, type: UpdateFoodDto })
  updateData: UpdateFoodDto[];
}
