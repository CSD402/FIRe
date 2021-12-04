import { Module } from '@nestjs/common';
import { TranslateController } from './controllers/translate.controller';

@Module({
  imports: [],
  controllers: [TranslateController],
})
export class TranslateModule {}
