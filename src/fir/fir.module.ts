import { Module } from '@nestjs/common';
import { FirController } from './fir.controller';

@Module({
  controllers: [FirController]
})
export class FirModule {}
