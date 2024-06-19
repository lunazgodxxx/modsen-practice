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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Roles } from 'src/auth/decorators';
import { JwtAuthGuard, RoleGuard } from 'src/auth/guards';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Register user into the system',
  })
  async create(@Res() res, @Body() dto: CreateUserDto) {
    await this.userService.create(dto);
    return res.status(HttpStatus.OK).json();
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
  })
  /**
   * Add pagination
   */
  async findAll(@Res() res): Promise<User[]> {
    const users = await this.userService.findAll();
    return res.status(HttpStatus.OK).json(users);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user with "id"',
  })
  async find(@Res() res, @Param('id') id: string): Promise<User> {
    const user = await this.userService.find(Number(id));
    return res.status(HttpStatus.OK).json(user);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user with "id"',
  })
  delete(@Res() res, @Param('id') id: string) {
    this.userService.delete(Number(id));
    return res.status(HttpStatus.ACCEPTED);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update user info',
  })
  async update(
    @Res() res,
    @Body() dto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<User> {
    const user = await this.userService.update(dto, Number(id));
    return res.status(HttpStatus.OK).json(user);
  }
}
