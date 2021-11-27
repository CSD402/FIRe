import { Injectable } from '@nestjs/common';
import { PoliceOfficer } from './interfaces/police-officer.interface';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';

@Injectable()
export class PoliceOfficerService {
    constructor(@InjectModel('PoliceOfficer') private readonly OfficerModel: Model<PoliceOfficer>) {}
    
    async getOfficer(): Promise<PoliceOfficer[]> {
        return await this.OfficerModel.find();
    }
    
    async postOfficer(officer: PoliceOfficer): Promise<PoliceOfficer> {
        const newOfficer = new this.OfficerModel(officer);
        return await newOfficer.save();
    }
    
    async getOfficerById(id: string): Promise<PoliceOfficer> {
        return await this.OfficerModel.findOne({ _id: id });
    }

    async deleteOfficerById(id: string): Promise<PoliceOfficer> {
        return await this.OfficerModel.findByIdAndRemove(id);
    }
    async putOfficerById(id: string, officer: PoliceOfficer): Promise<PoliceOfficer> {
        return await this.OfficerModel.findByIdAndUpdate(id, officer, { new: true });
      }
}
