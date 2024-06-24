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
} from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { Meeting } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators';
import { JwtAuthGuard, RoleGuard } from 'src/auth/guards';
import { CreateMeetupDto, UpdateMeetupDto } from './dto';
import { JoiPipe } from 'nestjs-joi';

@ApiTags('Meetups')
@Controller('meetup')
export class MeetupController {
  constructor(private meetupService: MeetupService) {}

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({
    summary: 'Register meetup',
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(JoiPipe) createMeetupDto: CreateMeetupDto) {
    const meetup = await this.meetupService.create(createMeetupDto);
    return meetup;
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get meetup with "id"',
  })
  @HttpCode(HttpStatus.OK)
  async find(@Param('id', ParseIntPipe) id: number): Promise<Meeting> {
    const meeting = await this.meetupService.find(id);
    return meeting;
  }

  /**
   * fix: remove offset, change to pages come from frontend
   */
  @Get()
  @ApiOperation({
    summary: 'Get meetings with offset pagination',
  })
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ): Promise<Meeting[]> {
    const meetings = await this.meetupService.findAll(page, limit);
    return meetings;
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({
    summary: 'Update meetup information',
  })
  @HttpCode(HttpStatus.OK)
  async update(
    @Body(JoiPipe) dto: UpdateMeetupDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Meeting> {
    const meetup = await this.meetupService.update(dto, id);
    return meetup;
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete meetup with "id"',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  delete(@Param('id', ParseIntPipe) id: number) {
    this.meetupService.delete(id);
  }
}
