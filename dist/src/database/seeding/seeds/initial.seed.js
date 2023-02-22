"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const country_list_1 = require("country-list");
const user_entity_1 = require("../../../user/entity/user.entity");
const country_entity_1 = require("../../../country/entity/country.entity");
const food_entity_1 = require("../../../food/entity/food.entity");
const accommodation_entity_1 = require("../../../accommodation/entity/accommodation.entity");
const program_entity_1 = require("../../../program/entity/program.entity");
const payment_entity_1 = require("../../../payment/entity/payment.entity");
const program_enum_1 = require("../../../program/entity/enum/program.enum");
class CreateSeed {
    async run(factory, connection) {
        await factory(user_entity_1.User)().createMany(3);
        await connection
            .createQueryBuilder()
            .insert()
            .into(accommodation_entity_1.Accommodation)
            .values([
            {
                name: 's1',
            },
            {
                name: 's2',
            },
            {
                name: 's3',
            },
            {
                name: 's4',
            },
        ])
            .execute();
        await connection
            .createQueryBuilder()
            .insert()
            .into(payment_entity_1.Payment)
            .values([
            {
                type: 'Kes',
            },
            {
                type: 'Faktura',
            },
            {
                type: 'Avans',
            },
        ])
            .execute();
        await connection
            .createQueryBuilder()
            .insert()
            .into(program_entity_1.Program)
            .values([
            {
                title: 'p1',
                description: '...',
                type: program_enum_1.ProgramType.BEFORE_NOON,
            },
            {
                title: 'p2',
                description: '...',
                type: program_enum_1.ProgramType.BEFORE_NOON,
            },
            {
                title: 'p3',
                description: '...',
                type: program_enum_1.ProgramType.AFTERNOON,
            },
            {
                title: 'p4',
                description: '...',
                type: program_enum_1.ProgramType.AFTERNOON,
            },
        ])
            .execute();
        await connection
            .createQueryBuilder()
            .insert()
            .into(food_entity_1.Food)
            .values([
            {
                name: 'dorucak',
            },
            {
                name: 'rucak',
            },
            {
                name: 'vecera',
            },
            {
                name: 'dorucak-rucak',
            },
            {
                name: 'dorucak-vecera',
            },
            {
                name: 'rucak-vecera',
            },
        ])
            .execute();
        const counties = country_list_1.getData();
        for (const country of counties) {
            await connection
                .createQueryBuilder()
                .insert()
                .into(country_entity_1.Country)
                .values([
                {
                    name: country.name,
                    code: country.code,
                },
            ])
                .execute();
        }
    }
}
exports.default = CreateSeed;
//# sourceMappingURL=initial.seed.js.map