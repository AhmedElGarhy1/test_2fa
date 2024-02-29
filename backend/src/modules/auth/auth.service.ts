import * as bcrypt from 'bcrypt';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailService } from 'src/common/modules/email/email.service';
import { TwoFactorService } from 'src/common/modules/twoFactor/TwoFactor.service';
import { mailConfig } from 'src/config';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly emailService: EmailService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly twoFactorService: TwoFactorService,
  ) {}

  async register(data: RegisterDto) {
    const { email, password } = data;

    // check if email already exist
    const userExist = await this.findByEmail(email);
    if (userExist) throw new BadRequestException('Email already exist');

    // create salt & hash
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.userModel.create({
      ...data,
      password: hash,
    });

    await this.emailService.sendVerificationEmail(email);

    return { message: 'Please check your email for confirmation' };
  }

  async login(data: LoginDto) {
    const { email, password, code } = data;

    // validate email
    const user = await this.findByEmail(email);
    if (!user) throw new BadRequestException("Email doen't exist");

    // validate password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) throw new BadRequestException('Invalid Password');

    // check if user is verified
    if (!user.verifiedAt) {
      throw new BadRequestException('Please verify your email first');
    }

    if (code) {
      const isValidOtp = this.twoFactorService.verifyToken(
        code,
        user.twoFactorToken,
      );
      if (!isValidOtp) throw new BadRequestException('Invalid code');
      else {
        if (!user.twoFactorEnabled) {
          user.twoFactorEnabled = true;
          await user.save();
        }
        const accessToken = this.generateAccessToken({ email });
        return { accessToken, message: 'Successfully Authenticated' };
      }
    }

    // check if setup 2FA
    if (user.twoFactorEnabled) {
      return { message: 'Please add code field' };
    }

    // generate new code
    const { secret, imageUrl } =
      await this.twoFactorService.generateToken(email);

    user.twoFactorToken = secret;
    await user.save();
    return { message: 'Please setup 2FA', imageUrl };
  }

  async verifyEmail(emailToken: string) {
    const verification = await this.emailService.findByEmailToken(emailToken);

    if (!verification.validateExpiration()) {
    }

    const user = await this.findByEmail(verification.email);
    if (!user) {
      throw new NotFoundException('Invalid email');
    }

    user.verifiedAt = new Date();
    const newUser = await user.save();
    await verification.deleteOne();
    return `
    <script>window.location.href = "${mailConfig.client.domain}/login"</script>;
    `;
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  generateAccessToken(payload: IJwtPayload) {
    return this.jwtService.sign(payload);
  }

  async sendVerificationEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException('email doesnt exist');

    if (user.verifiedAt)
      throw new BadRequestException('You are already verified');

    return await this.emailService.sendVerificationEmail(email);
  }
}
