import { Request } from 'express';
import { CountryService } from './country.service';
export declare class CountryController {
    private readonly countryService;
    constructor(countryService: CountryService);
    getAll(req: Request): Promise<{
        data: import("./entity/country.entity").Country[];
        total: number;
    }>;
    getById(id: number): Promise<import("./entity/country.entity").Country>;
    getByCode(code: string): Promise<import("./entity/country.entity").Country>;
}
