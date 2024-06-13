import { Injectable, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { sign } from 'jsonwebtoken';
import { IAuthenticate, Role } from './interfaces/user.interface';
import { AuthenticationDto } from './dto/auth.dto';
import { PrismaService } from 'nestjs-prisma';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { verifyPassword } from 'src/middleware/security';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  async authenticate(
    authenticateDto: AuthenticationDto,
  ): Promise<IAuthenticate> {
    const user = await this.prismaService.user.findFirst({
      where: {
        username: authenticateDto.username,
      },
    });

    if (!user) throw new NotFoundException('Invalid credentials');
    await verifyPassword(user.password, authenticateDto.password);

    const token = sign(
      { email: user.email, username: user.username, roles: user.roles },
      this.configService.get<string>('JWT_SECRET'),
    );

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles,
      },
    };
  }
}
