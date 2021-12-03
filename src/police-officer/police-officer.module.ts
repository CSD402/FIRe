import { Module } from '@nestjs/common';
import { PoliceOfficerService } from './services/police-officer.service';
import { PoliceOfficerController } from './controllers/police-officer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PoliceOfficerSchema } from './schemas/police-officer.schema';
import { AuthModule } from 'src/auth/auth.module';
// import { UserModule } from 'src/user/user.module';
// import { UserController } from 'src/user/controller/user.controller';
// import { UserService } from 'src/user/service/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PoliceOfficer', schema: PoliceOfficerSchema },
    ]),
    AuthModule,
    // UserModule,
  ],
  controllers: [PoliceOfficerController],
  providers: [PoliceOfficerService],
})
export class PoliceOfficerModule {}
