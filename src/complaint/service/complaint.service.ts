import { Complaint } from '../interfaces/complaint.interface';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Types } from 'mongoose';
import { combineAll } from 'rxjs';
import { Request } from 'express';
import jwt_decode from 'jwt-decode';
import { User } from 'src/user/interfaces/user.interface';

@Injectable()
export class ComplaintService {
  constructor(
    @InjectModel('Complaint') private readonly compaintModel: Model<Complaint>,
  ) {}

  // public async getComplaint(): Promise<Complaint[]> {
  //   try {
  //     return await this.compaintModel.find();
  //   } catch (error) {
  //     return error;
  //   }
  // }

  public async postComplaint(
    complaint: Complaint,
    request: Request,
  ): Promise<Complaint> {
    try {
      let userData: { user: User } = jwt_decode(request.headers.authorization);
      console.log(userData.user._id);

      var newComplaint = new this.compaintModel({
        ...complaint,
        filed_by: userData.user._id,
        filed_by_name: userData.user.name,
      });
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

  public async getComplaintById_User(request: Request): Promise<Complaint[]> {
    try {
      let userData: { user: User } = jwt_decode(request.headers.authorization);
      if (userData.user) {
        return await this.compaintModel.find({ filed_by: userData.user._id });
      } else return await this.compaintModel.find();
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

  public async findById(id: String): Promise<Complaint> {
    const complaint = await this.compaintModel.findOne({ _id: id });
    return complaint;
  }

  public async putComplaintById_review(
    id: string,
    // complaint: Complaint,
  ): Promise<JSON> {
    var complaint = await this.findById(id);

    if (complaint) {
      try {
        complaint.status = 'Under Review';

        await this.compaintModel.findByIdAndUpdate(id, complaint, {
          new: true,
        });

        var res = { message: 'complaint filed under review!' };

        return JSON.parse(JSON.stringify(res));
      } catch (error) {
        return error;
      }
    } else {
      var res = { message: 'complaint not present in database!' };

      return JSON.parse(JSON.stringify(res));
    }
  }

  public async putComplaintById_submit(
    id: string,
    // complaint: Complaint,
  ): Promise<JSON> {
    var complaint = await this.findById(id);

    if (complaint) {
      try {
        complaint.status = 'FIR lodged';

        await this.compaintModel.findByIdAndUpdate(id, complaint, {
          new: true,
        });

        var res = { message: 'complaint filed as FIR!' };

        return JSON.parse(JSON.stringify(res));
      } catch (error) {
        return error;
      }
    } else {
      var res = { message: 'complaint not present in database!' };

      return JSON.parse(JSON.stringify(res));
    }
  }
}
