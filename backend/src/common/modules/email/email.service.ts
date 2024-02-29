import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailVerification } from 'src/common/modules/email/schemas/email-verification.schema';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(
    @InjectModel(EmailVerification.name)
    private emailVerificationModel: Model<EmailVerification>,
    private readonly mailerService: MailerService,
  ) {}

  async findByEmailToken(emailToken: string) {
    const emailVerification = await this.emailVerificationModel.findOne({
      emailToken,
    });

    if (!emailVerification) {
      throw new BadRequestException('Invalid Token');
    }
    return emailVerification;
  }

  async createEmailToken(email: string) {
    const isExist = await this.emailVerificationModel.findOne({ email });

    // exist and less that 15 minutes
    if (isExist && isExist.validateExpiration()) {
      throw new BadRequestException('email has sent recently');
    }

    const expiresIn = 1000 * 60 * 60 * 4; // 4 hours
    const emailToken = Math.random().toString(36).slice(2);
    await this.emailVerificationModel.create({
      email,
      timestamp: new Date(),
      emailToken,
      expiresIn,
    });

    return emailToken;
  }

  async sendVerificationEmail(email: string) {
    await this.createEmailToken(email);

    const isExist = await this.emailVerificationModel.findOne({ email });

    if (!isExist) {
      throw new BadRequestException('Please Register first');
    }

    const url = `http://localhost:3000/api/auth/email/verify/${isExist.emailToken}`;
    return this.mailerService
      .sendMail({
        from: 'ElGarhy <garhyahmed2022@gmail.com>',
        to: email,
        subject: 'Verify your email',
        html: `
        <h1>To activate your account </h1>
        <a href="${url}">click here</a>
        `,
      })
      .then((info) => {
        console.log('Email sent successfully: ' + info.messageId);
      })
      .catch((err) => {
        console.log('Faild to send email to: ' + email, err);
      });
  }
}
