import { BadGatewayException, HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FoodService } from "src/food/food.service";
import { ProgramService } from "src/program/program.service";
import { ReservationDescriptionFoodService } from "src/reservation-description-food/reservation-description-food.service";
import { ReservationDescriptionProgramService } from "src/reservation-description-program/reservation-description-program.service";
import { ReservationDescriptionDto } from "src/reservation/dto/description.dto";
import { Reservation } from "src/reservation/entity/reservation.entity";
import { Repository } from "typeorm";
import { ReservationDescription } from "./entity/reservation-description.entity";

@Injectable()
export class ReservationDescriptionService {
  constructor(
    @InjectRepository(ReservationDescription)
    private reservationDescriptionRepo: Repository<ReservationDescription>,
    private readonly foodService: FoodService,
    private readonly programService: ProgramService,
    private readonly reservationDescriptionFoodService: ReservationDescriptionFoodService,
    private readonly reservationDescriptionProgramService: ReservationDescriptionProgramService
  ) {}

  async create(
    description: ReservationDescriptionDto,
    reservation: Reservation
  ): Promise<ReservationDescription> {
    try {
      const newDescription = this.reservationDescriptionRepo.create({
        date: new Date(description.date),
        reservation,
      });

      await this.reservationDescriptionRepo.save(newDescription);
      if (description.foodIds.length) {
        //const food = await this.foodService.findByIds(description.foodIds);
        //if (food) {
        for (const foodData of description.foodIds) {
          const food = await this.foodService.findOne(foodData.foodId);
          await this.reservationDescriptionFoodService.create(
            food,
            newDescription,
            foodData.personNumber,
            foodData.veganNumber,
            foodData.vegetarianNumber,
            foodData.glutenFreeNumber
          );
        }
        // }
      }
      if (description.programIds.length) {
        // const programs = await this.programService.findByIds(
        //   description.programIds
        // );
        //if (programs) {
        for (const programData of description.programIds) {
          const program = await this.programService.findOne(
            programData.programId
          );
          await this.reservationDescriptionProgramService.create(
            program,
            newDescription,
            programData.personNumber
          );
        }
      }

      await this.reservationDescriptionRepo.save(newDescription);

      return newDescription;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async deleteByReservationId(id: number) {
    return await this.reservationDescriptionRepo
      .createQueryBuilder()
      .delete()
      .from(ReservationDescription)
      .where("reservation.id = :id", { id })
      .execute();
  }
}
