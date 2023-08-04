import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PoliceOfficerModule } from './police-officer/police-officer.module';
import { FirModule } from './fir/fir.module';
import { ComplaintModule } from './complaint/complaint.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import config from './config/keys';
// import { TranslateModule } from './translate/translate.module';
// import { LanguagesModule } from './languages/languages.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../.env' }),
    ComplaintModule,
    AuthModule,
    FirModule,
    PoliceOfficerModule,
    UserModule,
    // TranslateModule,
    // LanguagesModule,
    MongooseModule.forRoot(config.mongoURI),
  ],
})
export class AppModule {}
