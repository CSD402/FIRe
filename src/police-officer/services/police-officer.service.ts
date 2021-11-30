import { Injectable } from '@nestjs/common';
import { PoliceOfficer } from './interfaces/police-officer.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PoliceOfficerService {
  constructor(
    @InjectModel('PoliceOfficer')
    private readonly OfficerModel: Model<PoliceOfficer>,
  ) {}

  async getOfficer(): Promise<PoliceOfficer[]> {
    try {
      return await this.OfficerModel.find();
    } catch (error) {
      return error;
    }
  }

  async postOfficer(officer: PoliceOfficer): Promise<PoliceOfficer> {
    const newOfficer = new this.OfficerModel(officer);
    try {
      return await newOfficer.save();
    } catch (error) {
      return error;
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
  async putOfficerById(
    id: string,
    officer: PoliceOfficer,
  ): Promise<PoliceOfficer> {
    try {
      return await this.OfficerModel.findByIdAndUpdate(id, officer, {
        new: true,
      });
    } catch (error) {
      return error;
    }
  }
}
