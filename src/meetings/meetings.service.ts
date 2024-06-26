import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateMeetingDto, UpdateMeetingDto } from './dto';
import { Meeting } from '@prisma/client';

@Injectable()
export class MeetingsService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateMeetingDto) {
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
      throw new NotFoundException(`Not found meeting: ${id} id`);
    }

    return meeting;
  }

  async findAll(page: number, limit: number): Promise<Meeting[]> {
    const offset = page * limit;
    return await this.prismaService.meeting.findMany({
      skip: offset,
      take: limit,
    });
  }

  delete(id: number) {
    this.prismaService.meeting.delete({ where: { id: id } });
  }

  async update(dto: UpdateMeetingDto, id: number): Promise<Meeting> {
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
  }
}
