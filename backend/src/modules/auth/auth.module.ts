import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { jwtConfig } from 'src/config';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from 'src/common/modules/email/email.module';
import { Mongoose } from 'mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TwoFactorModule } from 'src/common/modules/twoFactor/TwoFactor.module';

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
  providers: [AuthService],
})
export class AuthModule {}
