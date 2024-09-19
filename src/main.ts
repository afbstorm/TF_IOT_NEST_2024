import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { CurrentUserInterceptor } from './interceptors/current-user/current-user.interceptor';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cookieSession({
      keys: ['kpplbiu']
    })
  )
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder().setTitle("Demo API Architect IOT").build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
