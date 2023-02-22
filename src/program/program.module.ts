import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { Program } from './entity/program.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Program])],
  providers: [ProgramService],
  controllers: [ProgramController],
  exports: [ProgramService],
})
export class ProgramModule {}
