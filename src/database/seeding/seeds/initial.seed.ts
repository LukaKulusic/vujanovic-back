import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { getData } from "country-list";
import { User } from "src/user/entity/user.entity";
import { Country } from "src/country/entity/country.entity";
import { Food } from "src/food/entity/food.entity";
import { Accommodation } from "src/accommodation/entity/accommodation.entity";
import { Program } from "src/program/entity/program.entity";
import { Payment } from "src/payment/entity/payment.entity";
import { ProgramType } from "src/program/entity/enum/program.enum";

export default class CreateSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(User)().createMany(3);

    await connection
      .createQueryBuilder()
      .insert()
      .into(Accommodation)
      .values([
        {
          name: "s1",
        },
        {
          name: "s2",
        },
        {
          name: "s3",
        },
        {
          name: "s4",
        },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Payment)
      .values([
        {
          type: "Kes",
        },
        {
          type: "Faktura",
        },
        {
          type: "Avans",
        },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Program)
      .values([
        {
          title: "p1",
          description: "...",
          type: ProgramType.BEFORE_NOON,
        },
        {
          title: "p2",
          description: "...",
          type: ProgramType.BEFORE_NOON,
        },
        {
          title: "p3",
          description: "...",
          type: ProgramType.AFTERNOON,
        },
        {
          title: "p4",
          description: "...",
          type: ProgramType.AFTERNOON,
        },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Food)
      .values([
        {
          name: "dorucak",
        },
        {
          name: "rucak",
        },
        {
          name: "vecera",
        },
      ])
      .execute();

    const counties = getData();

    for (const country of counties) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Country)
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
