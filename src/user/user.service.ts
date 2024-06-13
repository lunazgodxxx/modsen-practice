import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'src/auth/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this.prismaService.user.findFirst({
        where: {
          OR: [{ email: dto.email }, { username: dto.username }],
        },
      });

      if (existingUser) {
        throw new BadRequestException('Email or username already exists');
      }

      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          username: dto.username,
          roles: [Role.Customer],
        },
      });

      return user;
    } catch (e) {
      throw e;
    }
  }

  deleteUser(id: number) {
    this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }

  async findUserWithId(id: number): Promise<User> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          id: id,
        },
      });

      return user;
    } catch (e) {
      throw e;
    }
  }

  async findAllUsers(): Promise<User[]> {
    try {
      const users = await this.prismaService.user.findMany();
      return users;
    } catch (e) {
      throw e;
    }
  }
}
