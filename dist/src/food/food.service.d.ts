import { Repository } from 'typeorm';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FoodDto } from './dto/food.dto';
import { Food } from './entity/food.entity';
export declare class FoodService {
    private foodRepo;
    constructor(foodRepo: Repository<Food>);
    getList(query: any): Promise<{
        data: Food[];
        total: number;
    }>;
    getMany(ids: Array<number>): Promise<{
        data: Food[];
    }>;
    findByIds(ids: number[]): Promise<Food[]>;
    getOne(id: number): Promise<{
        data: Food;
    }>;
    findAll(): Promise<Food[]>;
    findOne(id: number): Promise<Food>;
    findOneByName(name: string): Promise<Food>;
    create(body: FoodDto): Promise<{
        data: Food;
    }>;
    update(id: number, body: FoodDto): Promise<{
        data: Food;
    }>;
    updateMany(body: UpdateFoodDto[]): Promise<{
        data: any[];
    }>;
    delete(id: number): Promise<{
        data: number[];
    }>;
    deleteMany(ids: Array<number>): Promise<{
        data: number[];
    }>;
}
