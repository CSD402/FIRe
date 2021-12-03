import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PoliceOfficer } from '../interfaces/police-officer.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/service/auth.service';
// import { User } from 'src/user/interfaces/user.interface';

@Injectable()
export class PoliceOfficerService {
  constructor(
    @InjectModel('PoliceOfficer')
    private readonly OfficerModel: Model<PoliceOfficer>,
    private authService: AuthService,
  ) {}

  async getOfficer(): Promise<PoliceOfficer[]> {
    try {
      return await this.OfficerModel.find();
    } catch (error) {
      return error;
    }
  }

  async postOfficer(officer: PoliceOfficer): Promise<PoliceOfficer> {
    const pass = await this.authService.hashPassword(officer.password);
    officer.password = pass;

    const newOfficer = new this.OfficerModel(officer);

    try {
      const result = await newOfficer.save();
      const bearer = await this.authService.generateJWT_officer(result);
      var res = { bearer: bearer };
      return JSON.parse(JSON.stringify(res));
    } catch (e) {
      if (e.code === 11000) {
        return JSON.parse(
          JSON.stringify({
            issue: 'Duplicate key',
            duplicate_key: e.keyPattern,
          }),
        );
      }
      console.log(e);
    }
  }

  async getOfficerById(id: string): Promise<PoliceOfficer> {
    try {
      return await this.OfficerModel.findOne({ _id: id });
    } catch (error) {
      return error;
    }
  }

  async deleteOfficerById(id: string): Promise<PoliceOfficer> {
    try {
      return await this.OfficerModel.findByIdAndRemove(id);
    } catch (error) {
      return error;
    }
  }

  // async putOfficerById(
  //   id: string,
  //   officer: PoliceOfficer,
  // ): Promise<PoliceOfficer> {
  //   try {
  //     return await this.OfficerModel.findByIdAndUpdate(id, officer, {
  //       new: true,
  //     });
  //   } catch (error) {
  //     return error;
  //   }
  // }

  public async findByAadhaar(_aadhaar: Number): Promise<PoliceOfficer> {
    const officer = await this.OfficerModel.findOne({ aadhaar: _aadhaar });
    return officer;
  }

  public async validateOfficer(
    aadhaar: Number,
    password: string,
  ): Promise<PoliceOfficer> {
    const officer = await this.findByAadhaar(aadhaar);

    const res = await this.authService.comparePasswords(
      password,
      officer.password,
    );

    if (res) {
      return officer;
    } else {
      throw new UnauthorizedException();
    }
  }

  public async login(officer: PoliceOfficer): Promise<JSON> {
    try {
      const _officer = await this.validateOfficer(
        officer.aadhaar,
        officer.password,
      );
      const bearer = await this.authService.generateJWT_officer(officer);
      var res = { bearer: bearer };

      return JSON.parse(JSON.stringify(res));
    } catch (error) {
      return error;
    }
  }
}
