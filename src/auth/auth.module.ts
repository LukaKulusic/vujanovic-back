import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ModuleRef } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { User } from '../user/entity/user.entity';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    UserModule,
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    {
      provide: LocalStrategy,
      useFactory: async (moduleRef: ModuleRef) => {
        const auth = await moduleRef.resolve(AuthService);
        console.log('local start factory', { auth });
        return new LocalStrategy(auth);
      },
      inject: [ModuleRef],
    },
  ],
})
export class AuthModule {
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    const moduleRef = this.moduleRef;
  }
}
