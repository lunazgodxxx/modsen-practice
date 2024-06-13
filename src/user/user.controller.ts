import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Res() res, @Body() dto: CreateUserDto) {
    await this.userService.createUser(dto);
    return res.status(HttpStatus.OK);
  }

  @Get()
  async getAllUsers(@Res() res): Promise<User[]> {
    const users = await this.userService.findAllUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  @Get(':id')
  async getUserById(@Res() res, @Param('id') id: string): Promise<User> {
    const user = await this.userService.findUserWithId(Number(id));
    return res.status(HttpStatus.OK).json(user);
  }

  @Delete(':id')
  deleteUserById(@Res() res, @Param('id') id: string) {
    this.userService.deleteUser(Number(id));
    return res.status(HttpStatus.ACCEPTED);
  }
}
