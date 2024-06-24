import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto, ReponseUserDto } from './dto';
import { Roles } from 'src/auth/decorators';
import { JwtAuthGuard, RoleGuard } from 'src/auth/guards';
import { JoiPipe } from 'nestjs-joi';
import { FindAllPaginationDto } from './dto/findall-pagination.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Register user into the system',
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(JoiPipe) dto: CreateUserDto) {
    await this.userService.create(dto);
  }

  /**
   * query dto, with deafult values
   */
  @Get()
  @ApiOperation({
    summary: 'Get all users with offset pagination',
  })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(
    @Query() pagination: FindAllPaginationDto,
  ): Promise<ReponseUserDto[]> {
    const users = await this.userService.findAll(0, 10);
    console.log(pagination);
    return users;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user with "id"',
  })
  @HttpCode(HttpStatus.OK)
  async find(@Param('id', ParseIntPipe) id: number): Promise<ReponseUserDto> {
    const user = await this.userService.find(id);
    return user;
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user with "id"',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  delete(@Param('id', ParseIntPipe) id: number) {
    this.userService.delete(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update user info',
  })
  @HttpCode(HttpStatus.OK)
  async update(
    @Body(JoiPipe) dto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    const user = await this.userService.update(dto, id);
    return user;
  }
}
