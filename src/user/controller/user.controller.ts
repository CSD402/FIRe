import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDto } from '../dto/user.dto';
import { User } from '../interfaces/user.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getUsers(@Req() request): Promise<User[]> {
    console.log(request);
    return this.userService.getUser();
  }

  @HttpCode(201)
  @Post()
  public async postUser(@Body() user: UserDto): Promise<JSON> {
    return this.userService.postUser(user);
  }

  @Post('login')
  public async login(@Body() user: UserDto): Promise<JSON> {
    return this.userService.login(user);
  }

  @Get(':id')
  public async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Delete(':id')
  public async deleteUserById(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUserById(id);
  }

  // @Put(':id')
  // public async putUserById(
  //   @Body() updateuserDto: UserDto,
  //   @Param('id') id,
  // ): Promise<User> {
  //   return this.userService.putUserById(id, updateuserDto);
  // }
}
