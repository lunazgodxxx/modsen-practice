import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import * as argon from 'argon2';
import { Role } from 'src/auth/interface';
import { ResponseUserDto, CreateUserDto, UpdateUserDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
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
        name: dto.name,
        username: dto.username,
        password: dto.password,
        refreshToken: dto.refreshToken,
        roles: [Role.User],
      },
    });
    return user;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!existingUser) {
      throw new BadRequestException('User not found');
    }

    if (!existingUser.password) {
      throw new BadRequestException('User password is not set');
    }

    const passwordMatches = await argon.verify(
      existingUser.password,
      dto.password,
    );

    if (!passwordMatches) {
      throw new ForbiddenException('Invalid password');
    }

    const user = await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        email: dto.email,
        refreshToken: dto.refreshToken,
      },
    });

    return user;
  }

  async updateRefreshToken(id: number, hashedRt: string) {
    return await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        refreshToken: hashedRt,
      },
    });
  }

  delete(id: number) {
    this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }

  async find(id: number): Promise<ResponseUserDto> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: id,
      },
      select: {
        password: false,

        id: true,
        username: true,
        name: true,
        email: true,
        roles: true,

        updatedAt: true,
        createdAt: true,
      },
    });

    return user;
  }

  async findAll(page: number, limit: number): Promise<ResponseUserDto[]> {
    const offset = page * 200;
    const users = await this.prismaService.user.findMany({
      skip: offset,
      take: limit,
      select: {
        password: false,

        id: true,
        username: true,
        name: true,
        email: true,
        roles: true,

        updatedAt: true,
        createdAt: true,
      },
    });
    return users;
  }

  async findByUsername(username: string): Promise<User> {
    return this.prismaService.user.findFirst({
      where: {
        username: username,
      },
    });
  }

  async findById(id: number): Promise<User> {
    return this.prismaService.user.findFirst({
      where: {
        id: id,
      },
    });
  }
}
