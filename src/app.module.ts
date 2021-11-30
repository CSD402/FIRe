import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PoliceOfficerModule } from './police-officer/police-officer.module';
import { FirModule } from './fir/fir.module';
import { ComplaintModule } from './complaint/complaint.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import config from './config/keys';

@Module({
  imports: [
    ComplaintModule,
    AuthModule,
    FirModule,
    PoliceOfficerModule,
    UserModule,
    MongooseModule.forRoot(config.mongoURI),
  ],
})
export class AppModule {}
