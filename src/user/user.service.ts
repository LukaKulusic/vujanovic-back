import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import {
  RolesObject,
  UserRoles,
  UserRolesObject,
} from './entity/enum/roles.enum';
import { UpdateUsersDto } from './dto/update-many-users.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async getList(query) {
    const take = query._perPage || 10;
    const page = query._page || 1;
    const skip = (page - 1) * take;
    const keyword = query._q || '';
    let result = await this.userRepo.findAndCount({
      order: { id: query._sortOrder },
      where: { name: Like('%' + keyword + '%') },
      skip: skip,
      take: take,
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
      },
    });

    const users = result[0];

    const data = users.map((user) => {
      const roleObject = RolesObject[user.role];
      const { role, ...rest } = user;
      rest['role'] = roleObject;
      return rest;
    });

    return {
      data: data,
      total: result[1],
    };
  }
  async getMany(ids: Array<number>) {
    const result = await this.userRepo
      .createQueryBuilder('user')
      .where('user.id IN (:...ids)', { ids: ids })
      .getMany();
    if (result) return { data: result };
  }

  async getOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id: id },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        email: true,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const roleObject = RolesObject[user.role];
    const { role, ...result } = user;
    result['role'] = roleObject;
    return { data: result };
  }
  async findOne(id: number) {
    const result = await this.userRepo.findOneBy({ id });
    if (!result) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
  async findWithRole() {
    const result = await this.userRepo.find({
      select: {
        id: true,
        role: true,
        email: true,
      },
    });
    if (!result) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { username },
      select: ['id', 'username', 'name', 'password', 'role', 'email'],
    });
    return user;
  }

  async create(body: UserDto): Promise<Record<string, unknown> | undefined> {
    try {
      const { name, password, email, role } = body;
      const userRole = UserRolesObject[role.id].name;

      const username = body.username.toLocaleLowerCase();
      const alreadyUser = await this.userRepo.findOne({
        where: { username: username },
      });
      if (alreadyUser) {
        throw new HttpException(
          'Username already exist.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newUser = this.userRepo.create({
        username,
        name,
        password,
        role: userRole,
        email,
      });

      const dbNewUser = await this.userRepo.save(newUser);

      if (!dbNewUser) {
        throw new HttpException(
          `Bad request!Please enter valid username. `,
          HttpStatus.BAD_REQUEST,
        );
      }
      const result = await this.getOne(newUser.id);
      return result;
    } catch (error) {
      throw new HttpException(
        `Bad request!${error.message} `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, body: UpdateUserDto) {
    const alreadyUser = await this.userRepo.findOneBy({ id });
    if (alreadyUser) {
      if (body.role) {
        body.role = UserRolesObject[body.role.id].name;
        console.log(body.role);
      }
      await this.userRepo.save(Object.assign(alreadyUser, body));
      const result = await this.getOne(id);
      return result;
    }
  }
  async updateMany(body: UpdateUsersDto[]) {
    let result = [];

    for (let i = 0; i < body.length; i++) {
      const alreadyUser = await this.userRepo.findOneBy({ id: body[i].id });
      if (alreadyUser) {
        const user = await this.userRepo.save(
          Object.assign(alreadyUser, body[i]),
        );

        result.push(await this.getOne(body[i].id));
      }
    }
    return { data: [result] };
  }

  async delete(id: number) {
    const result = await this.userRepo.delete(id);
    return { data: [result.affected] };
  }
  async deleteMany(ids: Array<number>) {
    const result = await this.userRepo
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id IN (:...ids)', { ids: ids })
      .execute();

    if (result) return { data: [result.affected] };
  }
}
