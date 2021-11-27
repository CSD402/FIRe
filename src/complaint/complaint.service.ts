import { Complaint } from './interfaces/complaint.interface';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ComplaintService {
    constructor(@InjectModel('Complaint') private readonly compaintModel: Model<Complaint>) {}
    
    public async getComplaint(): Promise<Complaint[]> {
        return await this.compaintModel.find();
    }
    
    public async postComplaint(complaint: Complaint): Promise<Complaint> {
        const newComplaint = new this.compaintModel(complaint);
        return await newComplaint.save();
    }
    
    public async getComplaintById(id: string): Promise<Complaint> {
        return await this.compaintModel.findOne({ _id: id });
    }

    public async deleteComplaintById(id: string): Promise<Complaint> {
        return await this.compaintModel.findByIdAndRemove(id);
    }
    public async putComplaintById(id: string, complaint: Complaint): Promise<Complaint> {
        return await this.compaintModel.findByIdAndUpdate(id, complaint, { new: true });
      }
}
