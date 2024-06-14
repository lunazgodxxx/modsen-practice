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
  async create(@Res() res, @Body() dto: CreateUserDto) {
    await this.userService.create(dto);
    return res.status(HttpStatus.OK).json();
  }

  @Get()
  async findAll(@Res() res): Promise<User[]> {
    const users = await this.userService.findAll();
    return res.status(HttpStatus.OK).json(users);
  }

  @Get(':id')
  async find(@Res() res, @Param('id') id: string): Promise<User> {
    const user = await this.userService.find(Number(id));
    return res.status(HttpStatus.OK).json(user);
  }

  @Delete(':id')
  delete(@Res() res, @Param('id') id: string) {
    this.userService.delete(Number(id));
    return res.status(HttpStatus.ACCEPTED);
  }
}
