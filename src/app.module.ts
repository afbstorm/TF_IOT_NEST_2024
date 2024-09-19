import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleController } from './article/article.controller';
import { ArticleService } from './article/article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article/article.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { AuthService } from './user/auth/auth.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from './interceptors/current-user/current-user.interceptor';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'mogogu69',
      options: {
        trustServerCertificate : true
      },
      database: 'IOTDemoNest',
      entities: [Article, User],
      synchronize : true //a n'utiliser qu'en dev sous peine de perte de data
    }),
    TypeOrmModule.forFeature([Article, User])
  ],
  controllers: [AppController, ArticleController, UserController],
  providers: [AppService, ArticleService, UserService, AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor
    }],
})
export class AppModule {}

