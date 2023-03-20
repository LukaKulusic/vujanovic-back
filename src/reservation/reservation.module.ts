import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation } from './entity/reservation.entity';
import { ProgramService } from 'src/program/program.service';
import { ProgramModule } from 'src/program/program.module';
import { Program } from 'src/program/entity/program.entity';
import { CountryModule } from 'src/country/country.module';
import { CountryService } from 'src/country/country.service';
import { Country } from 'src/country/entity/country.entity';
import { Food } from 'src/food/entity/food.entity';
import { Accommodation } from 'src/accommodation/entity/accommodation.entity';
import { FoodService } from 'src/food/food.service';
import { AccommodationService } from 'src/accommodation/accommodation.service';
import { FoodModule } from 'src/food/food.module';
import { AccommodationModule } from 'src/accommodation/accommodation.module';
import { Payment } from 'src/payment/entity/payment.entity';
import { PaymentModule } from 'src/payment/payment.module';
import { PaymentService } from 'src/payment/payment.service';
import { MailService } from 'src/mail/mail.service';
import { MailModule } from 'src/mail/mail.module';
import { User } from 'src/user/entity/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { ReservationAccommodation } from 'src/reservation-accommodation/entity/reservation-accommodation.entity';
import { ReservationAccommodationService } from 'src/reservation-accommodation/reservation-accommodation.service';
import { ReservationDescriptionProgram } from 'src/reservation-description-program/entity/reservation-description-program.entity';
import { ReservationDescription } from 'src/reservation-description/entity/reservation-description.entity';
import { ReservationDescriptionFood } from 'src/reservation-description-food/entity/reservation-description-food.entity';
import { ReservationDescriptionModule } from 'src/reservation-description/reservation-description.module';
import { ReservationDescriptionService } from 'src/reservation-description/reservation-description.service';
import { ReservationDescriptionProgramModule } from 'src/reservation-description-program/reservation-description-program.module';
import { ReservationDescriptionFoodModule } from 'src/reservation-description-food/reservation-description-food.module';
import { ReservationDescriptionFoodService } from 'src/reservation-description-food/reservation-description-food.service';
import { ReservationDescriptionProgramService } from 'src/reservation-description-program/reservation-description-program.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reservation,
      Program,
      ReservationDescription,
      Country,
      Food,
      Accommodation,
      Payment,
      User,
      ReservationAccommodation,
      ReservationDescriptionProgram,
      ReservationDescriptionFood,
    ]),
    UserModule,
    ProgramModule,
    PaymentModule,
    CountryModule,
    FoodModule,
    AccommodationModule,
    MailModule,
    ReservationAccommodation,
    ReservationDescriptionModule,
    ReservationDescriptionProgramModule,
    ReservationDescriptionFoodModule,
  ],
  providers: [
    UserService,
    PaymentService,
    ReservationService,
    ProgramService,
    CountryService,
    FoodService,
    AccommodationService,
    MailService,
    ReservationAccommodationService,
    ReservationDescriptionService,
  ],
  controllers: [ReservationController],
  exports: [ReservationService],
})
export class ReservationModule {}
