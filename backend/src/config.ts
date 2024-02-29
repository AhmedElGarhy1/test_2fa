require('dotenv').config();

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
  client: {
    domain: 'http://localhost:5173',
  },
};

export const jwtConfig = {
  secretKey: 'KLHyu8(U*(SHC&789fehew9',
  strategy: 'jwt',
  expiresIn: 60 * 30, // 30 minutes
};

export const otpConfig = {
  secretKey: 'Ahmed ElGarhy',
  serviceName: 'ElGarhy',
  digits: 6,
  step: 30,
};
