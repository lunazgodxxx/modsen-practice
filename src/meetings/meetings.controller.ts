import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Get,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { AccessTokenGuard, RoleGuard } from 'src/auth/guards';
import { Roles } from 'src/common/decorators';
import { MeetingsService } from './meetings.service';
import { JoiPipe } from 'nestjs-joi';
import { CreateMeetingDto, UpdateMeetingDto } from './dto';
import { Meeting } from '@prisma/client';
import { FindAllPaginationDto } from 'src/common/dto';

@Controller('meetings')
export class MeetingsController {
  constructor(private meetingService: MeetingsService) {}

  @Roles('admin')
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(JoiPipe) createMeetupDto: CreateMeetingDto) {
    const meetup = await this.meetingService.create(createMeetupDto);
    return meetup;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async find(@Param('id', ParseIntPipe) id: number): Promise<Meeting> {
    const meeting = await this.meetingService.find(id);
    return meeting;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(@Query() pagination: FindAllPaginationDto): Promise<Meeting[]> {
    const meetings = await this.meetingService.findAll(
      pagination.page,
      pagination.limit,
    );
    return meetings;
  }

  @Roles('admin')
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Body(JoiPipe) dto: UpdateMeetingDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Meeting> {
    const meetup = await this.meetingService.update(dto, id);
    return meetup;
  }

  @Roles('admin')
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  delete(@Param('id', ParseIntPipe) id: number) {
    this.meetingService.delete(id);
  }
}
