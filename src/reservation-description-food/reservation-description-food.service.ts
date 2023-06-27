import { BadGatewayException, HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Food } from "src/food/entity/food.entity";
import { ReservationDescription } from "src/reservation-description/entity/reservation-description.entity";
import { Repository } from "typeorm";
import { ReservationDescriptionFood } from "./entity/reservation-description-food.entity";

@Injectable()
export class ReservationDescriptionFoodService {
  constructor(
    @InjectRepository(ReservationDescriptionFood)
    private reservationDescriptionFoodRepo: Repository<ReservationDescriptionFood>
  ) {}

  async create(
    food: Food,
    description: ReservationDescription,
    personNumber: number,
    veganNumber: number,
    vegetarianNumber: number,
    glutenFreeNumber: number
  ): Promise<ReservationDescriptionFood> {
    try {
      const ReservationDescriptionFood =
        this.reservationDescriptionFoodRepo.create({
          food,
          description,
          foodPersonNumber: personNumber,
          foodVeganNumber: veganNumber,
          foodVegetarianNumber: vegetarianNumber,
          foodGlutenFreeNumber: glutenFreeNumber,
        });
      await this.reservationDescriptionFoodRepo.save(
        ReservationDescriptionFood
      );
      return ReservationDescriptionFood;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async deleteByReservationId(id: number) {
    return await this.reservationDescriptionFoodRepo
      .createQueryBuilder()
      .delete()
      .from(ReservationDescriptionFood)
      .where("reservation.id = :id", { id })
      .execute();
  }
}
