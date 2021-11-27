import { Module } from '@nestjs/common';
import { PoliceOfficerService } from './police-officer.service';
import { PoliceOfficerController } from './police-officer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PoliceOfficerSchema } from './schemas/police-officer.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'PoliceOfficer', schema: PoliceOfficerSchema }])],
  controllers: [PoliceOfficerController], 
  providers: [PoliceOfficerService]
})
export class PoliceOfficerModule {}
