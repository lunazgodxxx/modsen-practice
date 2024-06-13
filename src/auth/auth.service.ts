import { Injectable, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { sign } from 'jsonwebtoken';
import { IAuthenticate, Role } from './interfaces/user.interface';
import { AuthenticationDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  users = [
    {
      id: 1,
      userName: 'egor',
      password: 'egor',
      role: Role.Admin,
    },
    {
      id: 1,
      userName: 'yahor',
      password: 'yahor',
      role: Role.Customer,
    },
  ];

  authenticate(authenticateDto: AuthenticationDto): IAuthenticate {
    const user = this.users.find(
      (u) =>
        u.userName === authenticateDto.username &&
        u.password === authenticateDto.password,
    );

    if (!user) throw new NotFoundException('Invalid credentials');

    const token = sign({ ...user }, 'secrete');

    return { token, user };
  }
}
