import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Role } from 'src/auth/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this.prismaService.user.findFirst({
        where: {
          OR: [{ email: dto.email }, { username: dto.username }],
        },
      });

      if (existingUser) {
        throw new BadRequestException('Email or username already exists');
      }

      const encryptedPassword = await argon.hash(dto.password);
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          username: dto.username,
          password: encryptedPassword,
          roles: [Role.User],
        },
      });
      console.log(user);
      return user;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async update(dto: UpdateUserDto, id: number): Promise<User> {
    try {
      const existingUser = await this.prismaService.user.findFirst({
        where: {
          id: id,
        },
      });

      if (!existingUser) {
        throw new BadRequestException('Email or username already exists');
      }

      const passwordMatches = await argon.verify(
        existingUser.password,
        dto.oldPassword,
      );
      if (!passwordMatches) throw new ForbiddenException('Access Denied');

      const encryptedPassword = await argon.hash(dto.newPassword);
      const user = await this.prismaService.user.update({
        where: {
          id: id,
        },
        data: {
          email: dto.email,
          password: encryptedPassword,
        },
      });

      return user;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  delete(id: number) {
    this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }

  async find(id: number): Promise<User> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          id: id,
        },
      });

      return user;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.prismaService.user.findMany();
      return users;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
