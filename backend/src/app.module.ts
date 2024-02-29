import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailConfig } from './config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MailerModule.forRoot(mailConfig),
    MongooseModule.forRoot('mongodb://localhost/2fa-test'),
    AuthModule,
  ],
})
export class AppModule {}
