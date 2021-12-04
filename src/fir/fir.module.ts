import { Module } from '@nestjs/common';
import { FirController } from './controllers/fir.controller';
import { FirService } from './service/fir.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FirSchema } from './schemas/fir.schema';
import { ComplaintSchema } from 'src/complaint/schemas/complaint.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Fir', schema: FirSchema },
      { name: 'Complaint', schema: ComplaintSchema },
    ]),
  ],
  controllers: [FirController],
  providers: [FirService],
})
export class FirModule {}
