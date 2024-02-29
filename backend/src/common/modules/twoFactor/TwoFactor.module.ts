import { Module } from '@nestjs/common';
import { TwoFactorService } from './TwoFactor.service';

@Module({
  providers: [TwoFactorService],
  exports: [TwoFactorService],
})
export class TwoFactorModule {}
