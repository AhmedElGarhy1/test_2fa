import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TwoFactorService } from 'src/common/modules/twoFactor/TwoFactor.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly twoFactorService: TwoFactorService,
  ) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() user: User) {
    return user;
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
