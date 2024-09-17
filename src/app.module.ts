import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleController } from './article/article.controller';
import { ArticleService } from './article/article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article/article.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'Test1234',
      options: {
        encrypt : false
      },
      database: 'IOTDemoNest',
      entities: [Article],
      synchronize : true //a n'utiliser qu'en dev sous peine de perte de data
    }),
    TypeOrmModule.forFeature([Article])
  ],
  controllers: [AppController, ArticleController],
  providers: [AppService, ArticleService],
})
export class AppModule {}
