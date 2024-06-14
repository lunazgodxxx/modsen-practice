import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { Meeting } from '@prisma/client';

@Controller('meetup')
export class MeetupController {
  constructor(private meetupService: MeetupService) {}

  @Post()
  async create(@Res() res, createMeetupDto: CreateMeetupDto) {
    await this.meetupService.create(createMeetupDto);
    return res.status(HttpStatus.OK).json();
  }

  @Get(':id')
  async find(@Res() res, @Param('id') id: string): Promise<Meeting> {
    const meeting = await this.meetupService.find(Number(id));
    return res.status(HttpStatus.OK).json(meeting);
  }

  @Get()
  async findAll(@Res() res): Promise<Meeting[]> {
    const meetings = await this.meetupService.findAll();
    return res.status(HttpStatus.OK).json(meetings);
  }

  @Delete(':id')
  delete(@Res() res, @Param('id') id: string) {
    this.meetupService.delete(Number(id));
    return res.status(HttpStatus.OK).json();
  }
}
