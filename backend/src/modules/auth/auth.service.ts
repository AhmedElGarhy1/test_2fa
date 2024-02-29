import * as bcrypt from 'bcrypt';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { EmailService } from 'src/common/modules/email/email.service';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { RegisterDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly emailService: EmailService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
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

    const accessToken = this.generateAccessToken({ email });

    return { user, accessToken, message: 'Successfull Register' };
  }

  async login(data: LoginDto) {
    const { email, password } = data;

    // validate email
    const user = await this.findByEmail(email);
    if (!user) throw new BadRequestException("Email doen't exist");

    // validate password
    const isValid = await user.validatePassword(password);
    if (!isValid) throw new BadRequestException('Invalid Password');

    const accessToken = this.generateAccessToken({ email });

    return { user, accessToken, message: 'Succussfull Login' };
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
    return newUser;
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
