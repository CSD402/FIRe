import { Complaint } from '../interfaces/complaint.interface';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ComplaintService {
  constructor(
    @InjectModel('Complaint') private readonly compaintModel: Model<Complaint>,
  ) {}

  public async getComplaint(): Promise<Complaint[]> {
    try {
      return await this.compaintModel.find();
    } catch (error) {
      return error;
    }
  }

  public async postComplaint(complaint: Complaint): Promise<Complaint> {
    const newComplaint = new this.compaintModel(complaint);
    try {
      return await newComplaint.save();
    } catch (error) {
      return error;
    }
  }

  public async getComplaintById(id: string): Promise<Complaint> {
    try {
      return await this.compaintModel.findOne({ _id: id });
    } catch (error) {
      return error;
    }
  }

  public async deleteComplaintById(id: string): Promise<Complaint> {
    try {
      return await this.compaintModel.findByIdAndRemove(id);
    } catch (error) {
      return error;
    }
  }
  public async putComplaintById(
    id: string,
    complaint: Complaint,
  ): Promise<Complaint> {
    try {
      return await this.compaintModel.findByIdAndUpdate(id, complaint, {
        new: true,
      });
    } catch (error) {
      return error;
    }
  }
}
