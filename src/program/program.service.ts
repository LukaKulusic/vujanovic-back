import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { UpdateProgramDto } from "./dto/update-program.dto";
import { ProgramDto } from "./dto/program.dto";
import { Program } from "./entity/program.entity";
import { UserRoles } from "../user/entity/enum/roles.enum";
import { UpdateProgramsDto } from "./dto/update-programs.dto";
import { ProgramTypeObject, TypesObject } from "./entity/enum/program.enum";

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(Program) private programRepo: Repository<Program>
  ) {}
  async getList(query) {
    const take = query._perPage || 10;
    const page = query._page || 1;
    const skip = (page - 1) * take;
    const keyword = query._q || "";
    let result = await this.programRepo.findAndCount({
      order: { id: query._sortOrder },
      where: { title: Like("%" + keyword + "%") },
      skip: skip,
      take: take,
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
      },
    });
    const programs = result[0];
    const data = programs.map((program) => {
      const typeObject = TypesObject[program.type];
      const { type, ...rest } = program;
      rest["type"] = typeObject;
      return rest;
    });
    return {
      data: data,
      total: result[1],
    };
  }
  async getMany(ids: Array<number>) {
    const result = await this.programRepo
      .createQueryBuilder("program")
      .where("program.id IN (:...ids)", { ids: ids })
      .getMany();
    if (result) return { data: result };
  }
  async getOne(id: number) {
    const program = await this.programRepo.findOne({
      where: { id: id },
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
      },
    });
    if (!program) {
      throw new HttpException("Program not found", HttpStatus.NOT_FOUND);
    }
    const typeObject = TypesObject[program.type];
    const { type, ...result } = program;
    result["type"] = typeObject;
    return { data: result };
  }
  async findAll(): Promise<Program[]> {
    const programs = await this.programRepo.find();
    return programs;
  }

  async findOne(id: number): Promise<Program> {
    const program = await this.programRepo.findOneBy({ id });
    if (!program) {
      throw new HttpException("Program not found", HttpStatus.NOT_FOUND);
    }
    return program;
  }

  async findOneByName(title: string): Promise<Program> {
    const program = await this.programRepo.findOne({ where: { title: title } });
    return program;
  }
  async findByIds(ids: number[]): Promise<Program[]> {
    const programs = await this.programRepo
      .createQueryBuilder("program")
      .where("program.id IN (:...ids)", { ids: ids })
      .getMany();
    if (programs.length) {
      return programs;
    }
  }

  async create(body: ProgramDto) {
    try {
      const { title, description, type } = body;
      const programType = ProgramTypeObject[type.id].name;
      const newProgram = this.programRepo.create({
        title,
        description,
        type: programType,
      });
      await this.programRepo.save(newProgram);
      const result = await this.getOne(newProgram.id);
      return result;
    } catch (error) {
      throw new HttpException(
        `Bad request!${error.message} `,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async update(id: number, body: UpdateProgramDto) {
    const alreadyProgram = await this.programRepo.findOneBy({ id });
    if (alreadyProgram) {
      if (body.type) {
        body.type = ProgramTypeObject[body.type.id].name;
      }
      await this.programRepo.save(Object.assign(alreadyProgram, body));
      return await this.getOne(id);
    }
  }
  async updateMany(body: UpdateProgramsDto[]) {
    let result = [];

    for (let i = 0; i < body.length; i++) {
      const alreadyProgram = await this.programRepo.findOneBy({
        id: body[i].id,
      });
      if (alreadyProgram) {
        await this.programRepo.save(Object.assign(alreadyProgram, body[i]));

        result.push(await this.getOne(body[i].id));
      }
    }
    return { data: result };
  }

  async delete(id: number) {
    const result = await this.programRepo.delete(id);
    return { data: [result.affected] };
  }
  async deleteMany(ids: Array<number>) {
    const result = await this.programRepo
      .createQueryBuilder()
      .delete()
      .from(Program)
      .where("id IN (:...ids)", { ids: ids })
      .execute();
    if (result) return { data: [result.affected] };
  }

  async getProgramIdsByReservationId(id: number) {
    const program = await this.programRepo
      .createQueryBuilder("program")
      .select(["program.id", "program.type"])
      .innerJoin("program.programsToReservation", "programsToReservation")
      .leftJoin("programsToReservation.reservation", "reservation")
      .where("reservation.id = :id", { id })
      .getMany();

    return program;
  }
}
