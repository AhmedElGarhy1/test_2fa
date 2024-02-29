import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { otpConfig } from 'src/config';
import * as qrcode from 'qrcode';

@Injectable()
export class TwoFactorService {
  async generateToken(email: string) {
    const { secretKey, serviceName } = otpConfig;

    const userSecret = authenticator.generate(secretKey);
    const otpauth = authenticator.keyuri(email, serviceName, secretKey);

    const imageUrl = await qrcode.toDataURL(otpauth);
    console.log(imageUrl);
    return `<img src="${imageUrl}" />`;
  }

  verifyToken(token: string) {
    return authenticator.verify({ token, secret: otpConfig.secretKey });
  }
}
