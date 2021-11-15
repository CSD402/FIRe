import { Module } from '@nestjs/common';
import { PoliceOfficerService } from './police-officer.service';

@Module({
  providers: [PoliceOfficerService]
})
export class PoliceOfficerModule {}
