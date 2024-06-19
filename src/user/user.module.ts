import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JoiPipeModule } from 'nestjs-joi';

@Module({
  imports: [PrismaService, JoiPipeModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
