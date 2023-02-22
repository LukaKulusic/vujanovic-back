import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FoodDto } from './dto/food.dto';
import { Food } from './entity/food.entity';
import { UserRoles } from '../user/entity/enum/roles.enum';

@Injectable()
export class FoodService {
  constructor(@InjectRepository(Food) private foodRepo: Repository<Food>) {}

  async getList(query) {
    const take = query._perPage || 10;
    const page = query._page || 1;
    const skip = (page - 1) * take;
    const keyword = query._q || '';
    let result = await this.foodRepo.findAndCount({
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
    const result = await this.foodRepo
      .createQueryBuilder('food')
      .where('food.id IN (:...ids)', { ids: ids })
      .getMany();
    if (result) return { data: result };
  }
  async getOne(id: number) {
    const result = await this.foodRepo.findOne({
      where: { id: id },
      select: {
        id: true,
        name: true,
      },
    });
    if (!result) {
      throw new HttpException('Food not found', HttpStatus.NOT_FOUND);
    }
    return { data: result };
  }
  async findAll(): Promise<Food[]> {
    const foods = await this.foodRepo.find();
    return foods;
  }

  async findOne(id: number): Promise<Food> {
    const food = await this.foodRepo.findOneBy({ id });
    if (!food) {
      throw new HttpException('Food not found', HttpStatus.NOT_FOUND);
    }
    return food;
  }

  async findOneByName(name: string): Promise<Food> {
    const food = await this.foodRepo.findOne({ where: { name: name } });
    return food;
  }

  async create(body: FoodDto) {
    try {
      const newFood = this.foodRepo.create({
        ...body,
      });
      const food = await this.foodRepo.save(newFood);
      const result = await this.getOne(newFood.id);
      return result;
    } catch (error) {
      throw new HttpException(
        `Bad request!${error.message} `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, body: FoodDto) {
    const alreadyFood = await this.foodRepo.findOneBy({ id });
    if (alreadyFood) {
      await this.foodRepo.save(Object.assign(alreadyFood, body));
      return await this.getOne(id);
    }
  }
  async updateMany(body: UpdateFoodDto[]) {
    let result = [];

    for (let i = 0; i < body.length; i++) {
      const alreadyFood = await this.foodRepo.findOneBy({
        id: body[i].id,
      });
      if (alreadyFood) {
        await this.foodRepo.save(Object.assign(alreadyFood, body[i]));

        result.push(await this.getOne(body[i].id));
      }
    }
    return { data: result };
  }

  async delete(id: number) {
    const result = await this.foodRepo.delete(id);
    return { data: [result.affected] };
  }
  async deleteMany(ids: Array<number>) {
    const result = await this.foodRepo
      .createQueryBuilder()
      .delete()
      .from(Food)
      .where('id IN (:...ids)', { ids: ids })
      .execute();
    if (result) return { data: [result.affected] };
  }
}
