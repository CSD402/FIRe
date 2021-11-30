import { Module } from '@nestjs/common';
import { PoliceOfficerService } from './services/police-officer.service';
import { PoliceOfficerController } from './controllers/police-officer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PoliceOfficerSchema } from './schemas/police-officer.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PoliceOfficer', schema: PoliceOfficerSchema },
    ]),
    AuthModule,
  ],
  controllers: [PoliceOfficerController],
  providers: [PoliceOfficerService],
})
export class PoliceOfficerModule {}
