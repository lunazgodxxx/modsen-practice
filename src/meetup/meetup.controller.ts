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
import { MeetupService } from './meetup.service';
import { Meeting } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators';
import { JwtAuthGuard, RoleGuard } from 'src/auth/guards';
import { CreateMeetupDto, UpdateMeetupDto } from './dto';
import { JoiPipe } from 'nestjs-joi';
import { number } from 'joi';

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
  async create(@Res() res, @Body(JoiPipe) createMeetupDto: CreateMeetupDto) {
    const created = await this.meetupService.create(createMeetupDto);
    return res.status(HttpStatus.OK).json(created);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get meetup with "id"',
  })
  async find(
    @Res() res,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Meeting> {
    const meeting = await this.meetupService.find(id);
    return res.status(HttpStatus.OK).json(meeting);
  }

  /**
   * fix: remove offset, change to pages come from frontend
   */
  @Get()
  @ApiOperation({
    summary: 'Get meetings with offset pagination',
  })
  async findAll(
    @Res() res,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ): Promise<Meeting[]> {
    const meetings = await this.meetupService.findAll(page, limit);
    return res.status(HttpStatus.OK).json(meetings);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({
    summary: 'Update meetup information',
  })
  async update(
    @Res() res,
    @Body(JoiPipe) dto: UpdateMeetupDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const meetup = await this.meetupService.update(dto, id);
    return res.status(HttpStatus.OK).json(meetup);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete meetup with "id"',
  })
  delete(@Res() res, @Param('id', ParseIntPipe) id: number) {
    this.meetupService.delete(id);
    return res.status(HttpStatus.OK).json();
  }
}
