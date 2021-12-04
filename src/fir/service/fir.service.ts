import { Injectable } from '@nestjs/common';
import { Fir } from '../interfaces/fir.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PoliceOfficer } from 'src/police-officer/interfaces/police-officer.interface';
import jwt_decode from 'jwt-decode';
import { Request } from 'express';
import { Complaint } from 'src/complaint/interfaces/complaint.interface';

@Injectable()
export class FirService {
  constructor(
    @InjectModel('Fir') private readonly firModel: Model<Fir>,
    @InjectModel('Complaint') private readonly compaintModel: Model<Complaint>,
  ) {}

  async getFir(): Promise<Fir[]> {
    try {
      return await this.firModel.find();
    } catch (error) {
      return error;
    }
  }

  async postFir(fir: Fir, request: Request): Promise<Fir> {
    let officerData: { officer: PoliceOfficer } = jwt_decode(
      request.headers.authorization,
    );

    const newFir = new this.firModel(fir);
    newFir.approved_by = officerData.officer['_id'];
    newFir.officer_name = officerData.officer.name;
    newFir.officer_phone = officerData.officer.phone_number;

    try {
      this.compaintModel.updateOne(
        { _id: newFir.complaint_id },
        {
          approved_by: officerData.officer['_id'],
          officer_name: officerData.officer.name,
          officer_phone: officerData.officer.phone_number,
          status: 'FIR Lodged',
        },
        (err) => console.log(err),
      );
      return await newFir.save();
    } catch (error) {
      return error;
    }
  }

  async getFirById(id: string): Promise<Fir> {
    try {
      return await this.firModel.findOne({ _id: id });
    } catch (error) {
      return error;
    }
  }

  async getFirById_Police(id: string): Promise<Fir[]> {
    try {
      return await this.firModel.find({ approved_by: id });
    } catch (error) {
      return error;
    }
  }

  async deleteFirById(id: string): Promise<Fir> {
    try {
      return await this.firModel.findByIdAndRemove(id);
    } catch (error) {
      return error;
    }
  }

  async putFirById(id: string, fir: Fir): Promise<Fir> {
    try {
      return await this.firModel.findByIdAndUpdate(id, fir, { new: true });
    } catch (error) {
      return error;
    }
  }
}
