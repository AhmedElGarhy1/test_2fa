import { IsEmail, Matches } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
    {
      message: 'Invalid Password',
    },
  )
  password: string;

  code: string;
}
