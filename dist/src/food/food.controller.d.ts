import { Request } from 'express';
import { FoodDto } from './dto/food.dto';
import { FoodService } from './food.service';
import { GetManyDto } from 'src/user/dto/get-many-user.dto';
import { UpdateManyFoodDto } from './dto/update-many-food.dto';
export declare class FoodController {
    private readonly foodService;
    constructor(foodService: FoodService);
    getList(req: Request): Promise<{
        data: import("./entity/food.entity").Food[];
        total: number;
    }>;
    getById(id: number): Promise<{
        data: import("./entity/food.entity").Food;
    }>;
    getMany(body: GetManyDto): Promise<{
        data: import("./entity/food.entity").Food[];
    }>;
    update(id: number, body: FoodDto): Promise<{
        data: import("./entity/food.entity").Food;
    }>;
    updateMany(body: UpdateManyFoodDto): Promise<{
        data: any[];
    }>;
    create(body: FoodDto): Promise<{
        data: import("./entity/food.entity").Food;
    }>;
    deleteUser(id: number): Promise<{
        data: number[];
    }>;
    deleteMany(body: GetManyDto): Promise<{
        data: number[];
    }>;
}
