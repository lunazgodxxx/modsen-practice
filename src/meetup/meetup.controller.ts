import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { Meeting } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Meetups')
@Controller('meetup')
export class MeetupController {
  constructor(private meetupService: MeetupService) {}

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth()
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

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth()
  @Delete(':id')
  delete(@Res() res, @Param('id') id: string) {
    this.meetupService.delete(Number(id));
    return res.status(HttpStatus.OK).json();
  }
}
