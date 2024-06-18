import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Roles } from 'src/auth/decorators';
import { JwtAuthGuard, RoleGuard } from 'src/auth/guards';

@ApiTags('User')
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

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth()
  @Delete(':id')
  delete(@Res() res, @Param('id') id: string) {
    this.userService.delete(Number(id));
    return res.status(HttpStatus.ACCEPTED);
  }

  @Put(':id')
  async update(
    @Res() res,
    @Body() dto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<User> {
    const user = await this.userService.update(dto, Number(id));
    return res.status(HttpStatus.OK).json(user);
  }
}
