import { Module } from '@nestjs/common';
import { LanguagesController } from './controllers/lanugages.controller';

@Module({
  imports: [],
  controllers: [LanguagesController],
})
export class LanguagesModule {}
