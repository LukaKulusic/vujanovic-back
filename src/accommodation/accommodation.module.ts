import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccommodationService } from './accommodation.service';
import { AccommodationController } from './accommodation.controller';
import { Accommodation } from './entity/accommodation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Accommodation])],
  providers: [AccommodationService],
  controllers: [AccommodationController],
  exports: [AccommodationService],
})
export class AccommodationModule {}
