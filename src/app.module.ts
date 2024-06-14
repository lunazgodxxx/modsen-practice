import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule, PrismaServiceOptions } from 'nestjs-prisma';
import { MeetupController } from './meetup/meetup.controller';
import { MeetupService } from './meetup/meetup.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      isGlobal: true,
    }),
    PrismaModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<PrismaServiceOptions> => ({
        prismaOptions: {
          datasourceUrl: configService.get<string>('DATABASE_URL'),
        },
      }),
    }),
  ],
  controllers: [AuthController, UserController, MeetupController],
  providers: [
    AuthService,
    UserService,
    MeetupService,
    JwtStrategy,
    PrismaService,
  ],
})
export class AppModule {}
