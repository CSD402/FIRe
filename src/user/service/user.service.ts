import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/service/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private authService: AuthService,
  ) {}

  public async getUser(): Promise<User[]> {
    try {
      return await this.userModel.find();
    } catch (error) {
      return error;
    }
  }

  public async postUser(user: User): Promise<JSON> {
    const pass = await this.authService.hashPassword(user.password);
    user.password = pass;

    const newUser = new this.userModel(user);

    try {
      const result = await newUser.save();
      const bearer = await this.authService.generateJWT_user(result);
      var res = { bearer: bearer };
      return JSON.parse(JSON.stringify(res));
    } catch (e) {
      if (e.code === 11000) {
        return JSON.parse(
          JSON.stringify({
            issue: 'Duplicate key',
            duplicate_key: e.keyPattern,
          }),
        );
      }
      console.log(e);
      return e;
    }
  }

  public async getUserById(id: string): Promise<User> {
    try {
      return await this.userModel.findOne({ _id: id });
    } catch (error) {
      return error;
    }
  }

  public async deleteUserById(id: string): Promise<User> {
    try {
      return await this.userModel.findByIdAndRemove(id);
    } catch (error) {
      return error;
    }
  }

  // public async putUserById(id: string, user: User): Promise<User> {
  //   try {
  //     return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  //   } catch (error) {
  //     return error;
  //   }
  // }

  public async findByAadhaar(_aadhaar: Number): Promise<User> {
    const user = await this.userModel.findOne({ aadhaar: _aadhaar });
    return user;
  }

  public async validateUser(aadhaar: Number, password: string): Promise<User> {
    const user = await this.findByAadhaar(aadhaar);

    if (!user) {
      throw new UnauthorizedException();
    }

    const res = await this.authService.comparePasswords(
      password,
      user.password,
    );

    if (res) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }

  public async login(data: User): Promise<JSON> {
    try {
      const user = await this.validateUser(data.aadhaar, data.password);
      const bearer = await this.authService.generateJWT_user(user);
      var res = { bearer: bearer };

      return JSON.parse(JSON.stringify(res));
    } catch (error) {
      return error;
    }
  }
}
