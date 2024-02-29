import { Injectable } from '@nestjs/common';
import { authenticator } from '@otplib/preset-default';
import { otpConfig } from 'src/config';
import * as qrcode from 'qrcode';

@Injectable()
export class TwoFactorService {
  async generateToken(email: string) {
    const { serviceName } = otpConfig;

    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(email, serviceName, secret);
    const imageUrl = await qrcode.toDataURL(otpauth);

    return {
      secret,
      imageUrl,
    };
  }

  verifyToken(token: string, secret: string) {
    const isValid = authenticator.check(token, secret);
    return isValid;
  }
}
