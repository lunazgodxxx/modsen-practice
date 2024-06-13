import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { PrismaService } from './prisma/prisma.service';
import {
  PrismaModule,
  PrismaModuleOptions,
  PrismaServiceOptions,
} from 'nestjs-prisma';
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
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService, JwtStrategy, PrismaService],
})
export class AppModule {}
