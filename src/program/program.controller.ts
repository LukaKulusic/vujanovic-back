import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Req } from '@nestjs/common';
import { Request } from 'express';
import { ProgramDto } from './dto/program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { UserRoles } from 'src/user/entity/enum/roles.enum';
import { Roles } from 'src/user/roles.decorator';
import { ProgramService } from './program.service';
import { GetManyDto } from 'src/user/dto/get-many-user.dto';
import { UpdateManyProgramDto } from './dto/update-many-program.dto';
@ApiTags('Program')
@ApiBearerAuth()
@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Get()
  async getList(@Req() req: Request) {
    return await this.programService.getList(req.query);
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    const program = await this.programService.getOne(id);
    if (program) {
      return program;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
  @Post('getMany')
  getMany(@Body() body: GetManyDto) {
    const { ids } = body;
    const result = this.programService.getMany(ids);
    if (result) {
      return result;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('/:id')
  @Roles(UserRoles.ADMIN)
  async update(@Param('id') id: number, @Body() body: UpdateProgramDto) {
    const updatedProgram = await this.programService.update(id, body);
    if (updatedProgram) {
      return updatedProgram;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
  @Post('updateMany')
  @Roles(UserRoles.ADMIN)
  updateMany(@Body() body: UpdateManyProgramDto) {
    const updatedPrograms = this.programService.updateMany(body.updateData);
    if (updatedPrograms) {
      return updatedPrograms;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @Roles(UserRoles.ADMIN)
  async create(@Body() body: ProgramDto) {
    const program = await this.programService.create(body);
    if (program) {
      return program;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id')
  @Roles(UserRoles.ADMIN)
  async deleteUser(@Param('id') id: number) {
    return await this.programService.delete(id);
  }
  @Post('deleteMany')
  @Roles(UserRoles.ADMIN)
  async deleteMany(@Body() body: GetManyDto) {
    const { ids } = body;
    return await this.programService.deleteMany(ids);
  }
}
