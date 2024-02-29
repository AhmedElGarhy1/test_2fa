import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { TwoFactorService } from 'src/common/modules/twoFactor/TwoFactor.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly twoFactorService: TwoFactorService,
  ) {}

  @Get()
  getAllUsers() {
    return this.twoFactorService.generateToken('gemater.g@gmail.com');
  }

  @Post('register')
  register(@Body() data: RegisterDto) {
    const user = this.authService.register(data);
    return user;
  }

  @Post('login')
  login(@Body() data: LoginDto) {
    const user = this.authService.login(data);
    return user;
  }

  @Get('email/resend-email-verification/:email')
  async resnedEmailVerification(@Param('email') email: string) {
    return this.authService.sendVerificationEmail(email);
  }

  @Get('email/verify/:token')
  async verifyEmail(@Param('token') token: string) {
    return this.authService.verifyEmail(token);
  }
}