import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const globalPrefix = configService.get<string>('GLOBAL_PREFIX');

  app.setGlobalPrefix(globalPrefix);
  await app.listen(port, () => {
    Logger.debug(`Listen at http://localhost:${port}/${globalPrefix}`);
  });
}
bootstrap();
