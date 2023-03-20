"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("typeorm-seeding");
const roles_enum_1 = require("../../user/entity/enum/roles.enum");
const user_entity_1 = require("../../user/entity/user.entity");
(0, typeorm_seeding_1.define)(user_entity_1.User, (Faker) => {
    const roles = Object.values(roles_enum_1.UserRoles);
    const user = new user_entity_1.User();
    user.name = `${Faker.name.firstName()} ${Faker.name.lastName()}`;
    user.username = `user${Faker.finance.amount(1, 9, 0)}`;
    user.password = '12345678';
    user.role = roles_enum_1.UserRoles.ADMIN;
    user.email = 'rafring5432@proton.me';
    return user;
});
//# sourceMappingURL=user.factory.js.map