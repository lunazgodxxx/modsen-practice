import { Module } from '@nestjs/common';
import { MeetupService } from './meetup.service';
import { MeetupController } from './meetup.controller';
import { PrismaService } from 'nestjs-prisma';
import { JoiPipeModule } from 'nestjs-joi';

@Module({
  imports: [PrismaService, JoiPipeModule],
  providers: [MeetupService],
  controllers: [MeetupController],
})
export class MeetupModule {}
