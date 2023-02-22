import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation } from './entity/reservation.entity';
import { ProgramService } from 'src/program/program.service';
import { ProgramModule } from 'src/program/program.module';
import { Program } from 'src/program/entity/program.entity';
import { ReservationProgram } from 'src/reservation-program/entity/reservation-program.entity';
import { ReservationProgramModule } from 'src/reservation-program/reservation-program.module';
import { ReservationProgramService } from 'src/reservation-program/reservation-program.service';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reservation,
      Program,
      ReservationProgram,
      Country,
      Food,
      Accommodation,
      Payment,
      User,
    ]),
    UserModule,
    ProgramModule,
    PaymentModule,
    ReservationProgramModule,
    CountryModule,
    FoodModule,
    AccommodationModule,
    MailModule,
  ],
  providers: [
    UserService,
    PaymentService,
    ReservationService,
    ProgramService,
    ReservationProgramService,
    CountryService,
    FoodService,
    AccommodationService,
    MailService,
  ],
  controllers: [ReservationController],
  exports: [ReservationService],
})
export class ReservationModule {}
