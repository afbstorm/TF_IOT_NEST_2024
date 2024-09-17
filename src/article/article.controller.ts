import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ArticleCreateDTO } from 'src/DTO/article_create.dto';
import { ArticleService } from './article.service';
import { ArticleUpdateDTO } from 'src/DTO/article_update.dto';

@Controller('article')
export class ArticleController {

    constructor(private articleService : ArticleService){}

    @Post()
    addArticle(@Body() newArticle: ArticleCreateDTO){
        this.articleService.create(newArticle)
    }

    @Get("list")
    test() {
        console.log("toto")
        
        return this.articleService.list
    }

    @Get("/:id")
    getById(@Param("id") id: number) {
        return this.articleService.getById(id)
    }

    @Delete("/:id")
    delete(@Param("id") id: number) {
        this.articleService.delete(id)
    }

    @Patch("/:id")
    update(@Param("id") id : number, @Body() article : ArticleUpdateDTO){
        this.articleService.update(id, article)
    }
}
