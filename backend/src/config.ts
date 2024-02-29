require('dotenv').config();
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const mailConfig = {
  transport: {
    host: 'smtp.gmail.com',
    // port: 465,
    port: 587,
    tls: {
      // ciphers: 'SSLv3',
      rejectUnauthorized: false,
    },
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  },
  defaults: {
    from: 'ElGarhy <gemater.g@gmail.com>',
  },
  template: {
    dir: process.cwd() + '/template/',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};

export const jwtConfig = {
  secretKey: 'KLHyu8(U*(SHC&789fehew9',
  strategy: 'jwt',
  expiresIn: 60 * 30, // 30 minutes
};

export const otpConfig = {
  secretKey: 'Ahmed ElGarhy',
  expiresIn: 60 * 5, // 5 minutes
  serviceName: 'ElGarhy',
};
