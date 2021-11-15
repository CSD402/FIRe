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

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

  @Get()
  public async getCars() {
    return this.userService.getUser();
  }

  @Post()
  public async postCar(@Body() user: UserDto) {
    return this.userService.postUser(user);
  }

  @Get(':id')
  public async getCarById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Delete(':id')
  public async deleteCarById(@Param('id') id: number) {
    return this.userService.deleteUserById(id);
  }

  @Put(':id')
  public async putCarById(@Param('id') id: number, @Query() query) {
    const propertyName = query.property_name;
    const propertyValue = query.property_value;
    return this.userService.putUserById(id, propertyName, propertyValue);
  }
}
