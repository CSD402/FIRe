import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
    public async getUser() {}
    public async postUser(newUser: UserDto) {}
    public async getUserById(id: string) {}
    public async deleteUserrById(id: string) {}
    public async putUserById(id: string,
        propertyName: string,
        propertyValue: string) {}
}
