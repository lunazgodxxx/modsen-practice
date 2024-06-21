import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Meeting } from '@prisma/client';
import { CreateMeetupDto, UpdateMeetupDto } from './dto';

@Injectable()
export class MeetupService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateMeetupDto) {
    /**
     * todo, add list of users email to notif them about meeting (nodemailer)
     */

    /**
     * bug: on one api call, creates two instances of one meeting in table
     */
    try {
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
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async find(id: number) {
    try {
      const meeting = await this.prismaService.meeting.findFirst({
        where: { id: id },
      });

      if (!meeting) {
        throw new NotFoundException(`Not found meeting: ${id} id`);
      }

      return meeting;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findAll(skip: number, take: number): Promise<Meeting[]> {
    try {
      return await this.prismaService.meeting.findMany({
        skip,
        take,
      });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }

  delete(id: number) {
    try {
      this.prismaService.meeting.delete({ where: { id: id } });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async update(dto: UpdateMeetupDto, id: number): Promise<Meeting> {
    try {
      const meeting = await this.prismaService.meeting.findFirst({
        where: { id: id },
      });

      if (!meeting) {
        throw new NotFoundException(`Not found meeting: ${id} id`);
      }

      const newMeeting = await this.prismaService.meeting.update({
        where: {
          id: id,
        },
        data: {
          place: dto.place,
          time: dto.time,
        },
      });

      return newMeeting;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
