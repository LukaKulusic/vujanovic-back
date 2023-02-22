import { Request } from 'express';
import { AccommodationDto } from './dto/accommodation.dto';
import { AccommodationService } from './accommodation.service';
import { GetManyDto } from 'src/user/dto/get-many-user.dto';
import { UpdateManyAccommodationDto } from './dto/update-many-accommodation';
export declare class AccommodationController {
    private readonly accommodationService;
    constructor(accommodationService: AccommodationService);
    getAll(req: Request): Promise<{
        data: import("./entity/accommodation.entity").Accommodation[];
        total: number;
    }>;
    getById(id: number): Promise<{
        data: import("./entity/accommodation.entity").Accommodation;
    }>;
    getMany(body: GetManyDto): Promise<{
        data: import("./entity/accommodation.entity").Accommodation[];
    }>;
    update(id: number, body: AccommodationDto): Promise<{
        data: import("./entity/accommodation.entity").Accommodation;
    }>;
    updateMany(body: UpdateManyAccommodationDto): Promise<{
        data: any[];
    }>;
    create(body: AccommodationDto): Promise<{
        data: import("./entity/accommodation.entity").Accommodation;
    }>;
    deleteUser(id: number): Promise<{
        data: number[];
    }>;
    deleteMany(body: GetManyDto): Promise<{
        data: number[];
    }>;
}
