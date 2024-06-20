import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Roles } from 'src/auth/decorators';
import { JwtAuthGuard, RoleGuard } from 'src/auth/guards';
import { JoiPipe } from 'nestjs-joi';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Register user into the system',
  })
  async create(@Res() res, @Body(JoiPipe) dto: CreateUserDto) {
    await this.userService.create(dto);
    return res.status(HttpStatus.OK).json();
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users with offset pagination',
  })
  async findAll(
    @Res() res,
    @Query('skip', ParseIntPipe) skip: number = 1,
    @Query('take', ParseIntPipe) take: number = 10,
  ): Promise<User[]> {
    const users = await this.userService.findAll(skip, take);
    return res.status(HttpStatus.OK).json(users);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user with "id"',
  })
  async find(@Res() res, @Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.userService.find(id);
    return res.status(HttpStatus.OK).json(user);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user with "id"',
  })
  delete(@Res() res, @Param('id', ParseIntPipe) id: number) {
    this.userService.delete(id);
    return res.status(HttpStatus.ACCEPTED);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update user info',
  })
  async update(
    @Res() res,
    @Body(JoiPipe) dto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    const user = await this.userService.update(dto, id);
    return res.status(HttpStatus.OK).json(user);
  }
}
