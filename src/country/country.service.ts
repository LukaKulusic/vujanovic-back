import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entity/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country) private countryRepo: Repository<Country>,
  ) {}

  async findAll() {
    const countries = await this.countryRepo.findAndCount();
    return {
      data: countries[0],
      total: countries[1],
    };
  }
  async findOne(id: number): Promise<Country> {
    const country = await this.countryRepo.findOneBy({ id });
    if (!country) {
      throw new HttpException('Country not found', HttpStatus.NOT_FOUND);
    }
    return country;
  }
  async findByCode(code: string): Promise<Country> {
    const country = await this.countryRepo.findOneBy({ code: code });
    if (country) {
      return country;
    } else throw new HttpException('Country not found', HttpStatus.NOT_FOUND);
  }
}
