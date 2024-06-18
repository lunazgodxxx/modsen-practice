import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { PrismaService } from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';
import { AuthenticationDto } from './dto';
import { IAuthenticate } from './interfaces';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  async authenticate(dto: AuthenticationDto): Promise<IAuthenticate> {
    const user = await this.prismaService.user.findFirst({
      where: {
        username: dto.username,
      },
    });

    if (!user) throw new NotFoundException('Invalid credentials');

    const passwordMatches = await argon.verify(user.password, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

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
