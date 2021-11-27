import { Module } from '@nestjs/common';
import { FirController } from './fir.controller';
import { FirService } from './fir.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FirSchema } from './schemas/fir.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Fir', schema: FirSchema }])],
  controllers: [FirController],
  providers: [FirService],
})
export class FirModule {}
