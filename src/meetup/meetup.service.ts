import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { Meeting } from '@prisma/client';

@Injectable()
export class MeetupService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateMeetupDto) {
    /**
     * todo, add list of users email to notif them about meeting
     */
    const meeting = await this.prismaService.meeting.create({
      data: {
        theme: dto.theme,
        description: dto.description,
        tags: dto.tags,
        place: dto.place,
        time: dto.time,
      },
    });

    return meeting;
  }

  async find(id: number) {
    const meeting = await this.prismaService.meeting.findFirst({
      where: { id: id },
    });

    if (!meeting) {
      return new HttpException(
        `Not found meeting: ${id} id`,
        HttpStatus.NOT_FOUND,
      );
    }

    return meeting;
  }

  async findAll(): Promise<Meeting[]> {
    return await this.prismaService.meeting.findMany();
  }

  delete(id: number) {
    this.prismaService.meeting.delete({ where: { id: id } });
  }

  async update(dto: UpdateMeetupDto) {}
}
