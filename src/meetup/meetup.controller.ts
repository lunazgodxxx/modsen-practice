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
import { MeetupService } from './meetup.service';
import { Meeting } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators';
import { JwtAuthGuard, RoleGuard } from 'src/auth/guards';
import { CreateMeetupDto, UpdateMeetupDto } from './dto';

@ApiTags('Meetups')
@Controller('meetup')
export class MeetupController {
  constructor(private meetupService: MeetupService) {}

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth()
  @Post()
  async create(@Res() res, @Body() createMeetupDto: CreateMeetupDto) {
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

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth()
  @Put(':id')
  async update(
    @Res() res,
    @Body() dto: UpdateMeetupDto,
    @Param('id') id: string,
  ) {
    const meetup = await this.meetupService.update(dto, Number(id));
    return res.status(HttpStatus.OK).json(meetup);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth()
  @Delete(':id')
  delete(@Res() res, @Param('id') id: string) {
    this.meetupService.delete(Number(id));
    return res.status(HttpStatus.OK).json();
  }
}
