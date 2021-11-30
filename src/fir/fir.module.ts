import { Module } from '@nestjs/common';
import { FirController } from './controllers/fir.controller';
import { FirService } from './service/fir.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FirSchema } from './schemas/fir.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Fir', schema: FirSchema }])],
  controllers: [FirController],
  providers: [FirService],
})
export class FirModule {}
