import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from 'nestjs-prisma';
import { Role } from './auth/interfaces';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const registerAdmin = async (app: INestApplication<any>) => {
  const prismaService = app.get(PrismaService);
  const configService = app.get(ConfigService);

  try {
    const sudoUser = await prismaService.user.findUnique({
      where: {
        email: configService.get<string>('SUDO_EMAIL'),
      },
    });

    if (!sudoUser) {
      const adminpass = await argon.hash(
        configService.get<string>('SUDO_PASSWORD'),
      );
      const user = await prismaService.user.create({
        data: {
          roles: [Role.Admin],
          email: configService.get<string>('SUDO_EMAIL'),
          username: configService.get<string>('SUDO_USERNAME'),
          password: adminpass,
        },
      });

      Logger.debug(`Created SUDO-user ${user.email}/${user.username}`);
    } else {
      Logger.debug('SUDO-user already exists');
    }
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      Logger.error('Unique constraint violation while creating admin user');
    } else {
      throw error;
    }
  }
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const globalPrefix = configService.get<string>('GLOBAL_PREFIX');

  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('Meetup-meetings API')
    .setVersion('v1.0')
    .addBearerAuth()
    .addTag('meetup api-v1')
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  const swaggerURL = configService.get<string>('SWAGGER_UI_URL');
  SwaggerModule.setup(swaggerURL, app, doc);

  registerAdmin(app);
  await app.listen(port, () => {
    Logger.debug(`Listen at http://localhost:${port}/${globalPrefix}`);
    Logger.debug(
      `Swagger-UI avialable on http://localhost:${port}/${swaggerURL}`,
    );
  });
}
bootstrap();
