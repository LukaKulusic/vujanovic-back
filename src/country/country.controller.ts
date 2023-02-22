import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Req } from '@nestjs/common';
import { Request } from 'express';
import { CountryService } from './country.service';
@ApiTags('Country')
@ApiBearerAuth()
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async getAll(@Req() req: Request) {
    return await this.countryService.findAll();
  }

  @Get('/:id')
  getById(@Param('id') id: number) {
    const country = this.countryService.findOne(id);
    if (country) {
      return country;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
  @Get('/code/:code')
  getByCode(@Param('code') code: string) {
    const country = this.countryService.findByCode(code);
    if (country) {
      return country;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
