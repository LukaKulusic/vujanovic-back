import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './user/user.module';
import * as typeOrmConfig from 'typeorm.config';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guard/jwt.guard';
import { CountryModule } from './country/country.module';
import { ProgramModule } from './program/program.module';
import { ReservationModule } from './reservation/reservation.module';
import { AccommodationModule } from './accommodation/accommodation.module';
import { FoodModule } from './food/food.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PaymentModule } from './payment/payment.module';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './user/roles.guard';
import { MailModule } from './mail/mail.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ReservationAccommodationModule } from './reservation-accommodation/reservation-accommodation.module';
import { ReservationDescriptionModule } from './reservation-description/reservation-description.module';
import { ReservationDescriptionFoodModule } from './reservation-description-food/reservation-description-food.module';
import { ReservationDescriptionProgramModule } from './reservation-description-program/reservation-description-program.module';
@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({ isGlobal: true }), // no need to import into other modules}),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    PassportModule,
    CountryModule,
    ProgramModule,
    ReservationModule,
    AccommodationModule,
    FoodModule,
    PaymentModule,
    MailModule,
    ReservationAccommodationModule,
    ReservationDescriptionModule,
    ReservationDescriptionFoodModule,
    ReservationDescriptionProgramModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
