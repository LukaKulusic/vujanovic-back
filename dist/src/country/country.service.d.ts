import { Repository } from 'typeorm';
import { Country } from './entity/country.entity';
export declare class CountryService {
    private countryRepo;
    constructor(countryRepo: Repository<Country>);
    findAll(): Promise<{
        data: Country[];
        total: number;
    }>;
    findOne(id: number): Promise<Country>;
    findByCode(code: string): Promise<Country>;
}
