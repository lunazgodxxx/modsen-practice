import { Module } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { MeetupController } from './meetup.controller';
import { PrismaService } from 'nestjs-prisma';

@Module({
  imports: [PrismaService],
  providers: [MeetupService],
  controllers: [MeetupController],
})
export class MeetupModule {}
