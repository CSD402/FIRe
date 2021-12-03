import { Injectable } from '@nestjs/common';
import { Fir } from '../interfaces/fir.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FirService {
  constructor(@InjectModel('Fir') private readonly firModel: Model<Fir>) {}

  async getFir(): Promise<Fir[]> {
    try {
      return await this.firModel.find();
    } catch (error) {
      return error;
    }
  }

  async postFir(fir: Fir): Promise<Fir> {
    console.log(fir);
    const newFir = new this.firModel(fir);

    try {
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
