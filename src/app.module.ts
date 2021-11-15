import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PoliceOfficerController } from './police-officer/police-officer.controller';
import { PoliceOfficerModule } from './police-officer/police-officer.module';
import { FirService } from './fir/fir.service';
import { FirModule } from './fir/fir.module';
import { ComplaintController } from './complaint/complaint.controller';
import { ComplaintModule } from './complaint/complaint.module';

@Module({
  imports: [UserModule, PoliceOfficerModule, FirModule, ComplaintModule],
  controllers: [PoliceOfficerController, ComplaintController],
  providers: [FirService],
})
export class AppModule {}
