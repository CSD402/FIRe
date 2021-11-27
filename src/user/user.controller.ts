import { Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query, } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { User } from './interfaces/user.interface';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

  @Get()
  public async getUsers(): Promise<User[]> {
    return this.userService.getUser();
  }

  @Post()
  public async postUser(@Body() user: UserDto): Promise<User> {
    return this.userService.postUser(user);
  }

  @Get(':id')
  public async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Delete(':id')
  public async deleteUserById(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUserById(id);
  }

  @Put(':id')
  public async putUserById(@Body() updateuserDto: UserDto, @Param('id') id): Promise<User> {
    return this.userService.putUserById(id, updateuserDto);
  }
}
