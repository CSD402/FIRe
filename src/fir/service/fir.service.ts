import { Injectable } from '@nestjs/common';
import { Fir } from './interfaces/fir.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FirService {
  constructor(@InjectModel('Fir') private readonly compaintModel: Model<Fir>) {}

  async getFir(): Promise<Fir[]> {
    try {
      return await this.compaintModel.find();
    } catch (error) {
      return error;
    }
  }

  async postFir(fir: Fir): Promise<Fir> {
    console.log(fir);
    const newFir = new this.compaintModel(fir);

    try {
      return await newFir.save();
    } catch (error) {
      return error;
    }
  }

  async getFirById(id: string): Promise<Fir> {
    try {
      return await this.compaintModel.findOne({ _id: id });
    } catch (error) {
      return error;
    }
  }

  async deleteFirById(id: string): Promise<Fir> {
    try {
      return await this.compaintModel.findByIdAndRemove(id);
    } catch (error) {
      return error;
    }
  }

  async putFirById(id: string, fir: Fir): Promise<Fir> {
    try {
      return await this.compaintModel.findByIdAndUpdate(id, fir, { new: true });
    } catch (error) {
      return error;
    }
  }
}
