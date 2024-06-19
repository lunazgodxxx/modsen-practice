import { NestApplication, NestFactory } from '@nestjs/core';
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

  try {
    const sudoUser = await prismaService.user.findUnique({
      where: {
        email: 'lunazgodxxx@modsen.com',
      },
    });

    if (!sudoUser) {
      /**
       * change with env params
       */
      const adminpass = await argon.hash('admin');
      await prismaService.user.create({
        data: {
          roles: [Role.Admin],
          email: 'lunazgodxxx@mosen.com',
          username: 'admin',
          password: adminpass,
        },
      });

      Logger.debug('Created SUDO-user "lunazgodxxx@modsen.com"/"admin"');
    } else {
      Logger.debug('SUDO-user "lunazgodxxx@modsen.com"/"admin" already exists');
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
  SwaggerModule.setup(configService.get<string>('SWAGGER_UI_URL'), app, doc);

  registerAdmin(app);
  await app.listen(port, () => {
    Logger.debug(`Listen at http://localhost:${port}/${globalPrefix}`);
  });
}
bootstrap();
