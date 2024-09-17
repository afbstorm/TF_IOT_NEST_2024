import { Body, Controller, Post } from '@nestjs/common';
import { ArticleCreateDTO } from 'src/DTO/article_create.dto';

@Controller('article')
export class ArticleController {

    @Post()
    addArticle(@Body() newArticle: ArticleCreateDTO){
        console.log(newArticle)
        return "Ok ça marche"
    }
}
