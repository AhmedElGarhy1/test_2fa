import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { jwtConfig } from 'src/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  jwtConfig.strategy,
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secretKey,
    });
  }

  async validate({ email }: IJwtPayload) {
    const user = await this.authService.findByEmail(email);

    if (!user) throw new UnauthorizedException('User Unauthorized');
    return user;
  }
}
