import { IsEmail, IsNotEmpty } from 'class-validator';

export class TwoFaDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  code: string;
}
