import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class EmailVerification {
  @Prop()
  email: string;

  @Prop()
  emailToken: string;

  @Prop({ default: Date.now() })
  timestamp: Date;

  @Prop()
  expiresIn: number; // in seconds

  validateExpiration: () => boolean;
}

export const EmailVerificationSchema =
  SchemaFactory.createForClass(EmailVerification);

EmailVerificationSchema.methods.validateExpiration = function () {
  console.log(
    new Date().getTime(),
    this.timestamp.getTime(),
    new Date().getTime() - this.timestamp.getTime(),
    this.expiresIn,
  );
  return new Date().getTime() - this.timestamp.getTime() < this.expiresIn;
};
