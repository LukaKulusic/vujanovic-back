import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UpdateAccommodationDto } from './dto/update-accommodation.dto';
import { AccommodationDto } from './dto/accommodation.dto';
import { UserRoles } from '../user/entity/enum/roles.enum';
import { Accommodation } from './entity/accommodation.entity';

@Injectable()
export class AccommodationService {
  constructor(
    @InjectRepository(Accommodation)
    private accommodationRepo: Repository<Accommodation>,
  ) {}
  async getList(query) {
    const take = query._perPage || 10;
    const page = query._page || 1;
    const skip = (page - 1) * take;
    const keyword = query._q || '';
    let result = await this.accommodationRepo.findAndCount({
      order: { id: query._sortOrder },
      where: { name: Like('%' + keyword + '%') },
      skip: skip,
      take: take,
      select: {
        id: true,
        name: true,
      },
    });

    return {
      data: result[0],
      total: result[1],
    };
  }
  async getMany(ids: Array<number>) {
    const result = await this.accommodationRepo
      .createQueryBuilder('accommodation')
      .where('accommodation.id IN (:...ids)', { ids: ids })
      .getMany();
    if (result) return { data: result };
  }
  async getOne(id: number) {
    const result = await this.accommodationRepo.findOne({
      where: { id: id },
      select: {
        id: true,
        name: true,
      },
    });
    if (!result) {
      throw new HttpException('Accommodation not found', HttpStatus.NOT_FOUND);
    }
    return { data: result };
  }

  async findAll(): Promise<Accommodation[]> {
    const accommodations = await this.accommodationRepo.find();
    return accommodations;
  }

  async findOne(id: number): Promise<Accommodation> {
    const accommodation = await this.accommodationRepo.findOneBy({ id });
    if (!accommodation) {
      throw new HttpException('Accommodation not found', HttpStatus.NOT_FOUND);
    }
    return accommodation;
  }

  async findOneByName(name: string): Promise<Accommodation> {
    const Accommodation = await this.accommodationRepo.findOne({
      where: { name: name },
    });
    return Accommodation;
  }

  async create(body: AccommodationDto) {
    try {
      const { name } = body;
      const newAccommodation = this.accommodationRepo.create({
        name,
      });
      const accommodation = await this.accommodationRepo.save(newAccommodation);
      const result = await this.getOne(accommodation.id);
      return result;
    } catch (error) {
      throw new HttpException(
        `Bad request!${error.message} `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, body: AccommodationDto) {
    const alreadyAccommodation = await this.accommodationRepo.findOneBy({ id });
    if (alreadyAccommodation) {
      await this.accommodationRepo.save(
        Object.assign(alreadyAccommodation, body),
      );
      return await this.getOne(id);
    }
  }
  async updateMany(body: UpdateAccommodationDto[]) {
    let result = [];

    for (let i = 0; i < body.length; i++) {
      const alreadyAccommodation = await this.accommodationRepo.findOneBy({
        id: body[i].id,
      });
      if (alreadyAccommodation) {
        await this.accommodationRepo.save(
          Object.assign(alreadyAccommodation, body[i]),
        );

        result.push(await this.getOne(body[i].id));
      }
    }
    return { data: result };
  }

  async delete(id: number) {
    const result = await this.accommodationRepo.delete(id);
    return { data: [result.affected] };
  }
  async deleteMany(ids: Array<number>) {
    const result = await this.accommodationRepo
      .createQueryBuilder()
      .delete()
      .from(Accommodation)
      .where('id IN (:...ids)', { ids: ids })
      .execute();
    if (result) return { data: [result.affected] };
  }
}
