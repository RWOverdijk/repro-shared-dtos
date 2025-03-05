import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Example API')
      .setDescription('Example api.')
      .setVersion('1.0')
      .build(),
  );


  app.enableCors();
  app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,

      // Optional: This will transform payloads to the DTO type.
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  SwaggerModule.setup('api', app, () => document);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}

bootstrap();
