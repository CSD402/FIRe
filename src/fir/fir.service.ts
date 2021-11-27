import { Injectable } from '@nestjs/common';
import { Fir} from './interfaces/fir.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class FirService {
    constructor(@InjectModel('Fir') private readonly compaintModel: Model<Fir>) {}
    
    async getFir(): Promise<Fir[]> {
        return await this.compaintModel.find();
    }
    
    async postFir(fir: Fir): Promise<Fir> {
        console.log(fir);
        const newFir = new this.compaintModel(fir);
        return await newFir.save();
    }
    
    async getFirById(id: string): Promise<Fir> {
        return await this.compaintModel.findOne({ _id: id });
    }

    async deleteFirById(id: string): Promise<Fir> {
        return await this.compaintModel.findByIdAndRemove(id);
    }
    async putFirById(id: string, fir: Fir): Promise<Fir> {
        return await this.compaintModel.findByIdAndUpdate(id, fir, { new: true });
      }
}
