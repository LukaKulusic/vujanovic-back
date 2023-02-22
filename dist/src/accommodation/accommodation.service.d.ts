import { Repository } from 'typeorm';
import { UpdateAccommodationDto } from './dto/update-accommodation.dto';
import { AccommodationDto } from './dto/accommodation.dto';
import { Accommodation } from './entity/accommodation.entity';
export declare class AccommodationService {
    private accommodationRepo;
    constructor(accommodationRepo: Repository<Accommodation>);
    getList(query: any): Promise<{
        data: Accommodation[];
        total: number;
    }>;
    getMany(ids: Array<number>): Promise<{
        data: Accommodation[];
    }>;
    getOne(id: number): Promise<{
        data: Accommodation;
    }>;
    findAll(): Promise<Accommodation[]>;
    findOne(id: number): Promise<Accommodation>;
    findOneByName(name: string): Promise<Accommodation>;
    create(body: AccommodationDto): Promise<{
        data: Accommodation;
    }>;
    update(id: number, body: AccommodationDto): Promise<{
        data: Accommodation;
    }>;
    updateMany(body: UpdateAccommodationDto[]): Promise<{
        data: any[];
    }>;
    delete(id: number): Promise<{
        data: number[];
    }>;
    deleteMany(ids: Array<number>): Promise<{
        data: number[];
    }>;
}
