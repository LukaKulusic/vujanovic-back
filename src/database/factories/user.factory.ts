import { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { UserRoles } from '../../user/entity/enum/roles.enum';
import { User } from '../../user/entity/user.entity';

define(User, (Faker: typeof faker) => {
  const roles = Object.values(UserRoles);
  const user = new User();

  user.name = `${Faker.name.firstName()} ${Faker.name.lastName()}`;
  user.username = `user${Faker.finance.amount(1, 9, 0)}`;
  user.password = '12345678';
  user.role = UserRoles.ADMIN; //roles[Math.floor(Math.random() * roles.length)];
  user.email = 'rafring5432@proton.me'; //Rafting5432

  return user;
});
