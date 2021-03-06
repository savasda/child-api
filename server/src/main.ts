import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
const port = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [
      'http://localhost:4200', // angular
      'http://localhost:4300', // angular
    ],
  });

  const usersOptions = new DocumentBuilder()
    .setTitle('Children API')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
      'access-token',
    )
    .build();


  const usersDocument = SwaggerModule.createDocument(app, usersOptions);

  SwaggerModule.setup('swagger', app, usersDocument);


  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
