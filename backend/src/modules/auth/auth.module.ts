import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { EmailModule } from 'src/common/modules/email/email.module';
import { TwoFactorModule } from 'src/common/modules/twoFactor/TwoFactor.module';
import { jwtConfig } from 'src/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from './schemas/user.schema';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: jwtConfig.strategy,
    }),
    JwtModule.register({
      secret: jwtConfig.secretKey,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    EmailModule,
    TwoFactorModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
