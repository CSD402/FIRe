import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface'; 
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
   constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
    
    public async getUser(): Promise<User[]> {
        return await this.userModel.find();
    }
    
    public async postUser(user: User): Promise<User> {
        const newComplaint = new this.userModel(user);
        return await newComplaint.save();
    }
    
    public async getUserById(id: string): Promise<User> {
        return await this.userModel.findOne({ _id: id });
    }

    public async deleteUserById(id: string): Promise<User> {
        return await this.userModel.findByIdAndRemove(id);
    }
    public async putUserById(id: string, user: User): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, user, { new: true });
      }
}
