import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  await app.listen(port, () => {
    Logger.debug(`Listen at http://localhost:${port}/${globalPrefix}`);
  });
}
bootstrap();
