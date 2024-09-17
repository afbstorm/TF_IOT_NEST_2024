import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ArticleCreateDTO } from 'src/DTO/article_create.dto';
import { ArticleService } from './article.service';
import { ArticleUpdateDTO } from 'src/DTO/article_update.dto';

@Controller('article')
export class ArticleController {

    constructor(private articleService : ArticleService){}

   
    @Get("list")
    test() {
        return this.articleService.getAll()
    }

    @Post()
    addArticle(@Body() newArticle: ArticleCreateDTO){
        return this.articleService.create(newArticle)
    }


    @Get("/:id")
    getById(@Param("id") id: number) {
        return this.articleService.getById(id)
    }

    // @Delete("/:id")
    // delete(@Param("id") id: number) {
    //     this.articleService.delete(id)
    // }

    // @Patch("/:id")
    // update(@Param("id") id : number, @Body() article : ArticleUpdateDTO){
    //     this.articleService.update(id, article)
    // }
}
