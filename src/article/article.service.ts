import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleCreateDTO } from 'src/DTO/article_create.dto';
import { ArticleUpdateDTO } from 'src/DTO/article_update.dto';
import { Article } from './article.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ArticleService {

    constructor(@InjectRepository(Article) private articleRepo: Repository<Article>){}

    async getAll() : Promise<Article[]> {
        return this.articleRepo.find()
    }

    async create(article : ArticleCreateDTO) : Promise<ArticleCreateDTO>{
        return this.articleRepo.save(article)
    }

    async getById(id : number): Promise<Article>{
        return this.articleRepo.findOne({where : {id : id}})
    }

    async delete(id:number) : Promise<DeleteResult> {
        return this.articleRepo.delete(id)
    }

    async update(id:number, article: ArticleUpdateDTO) : Promise<UpdateResult> {
        return this.articleRepo.update(id, article)
    }

    async getLike(id : number) : Promise<Article>
    {
        return this.articleRepo.findOne(
            {where : {id : id}
            , relations : {like : true}
        })
    }

    // list: ArticleCreateDTO[] = []

    // create(newArticle : ArticleCreateDTO){
    //     this.list.push(newArticle)
    // }

    // getAll() : ArticleCreateDTO[] {
    //     return this.list
    // }

    // getById(id : number) : ArticleCreateDTO {
    //     return this.list.find(x => x.id == id)
    // }

    // delete(id:number) {
    //     let index = this.list.findIndex(x => x.id == id)
    //     this.list.splice(index, 1)
    // }

    // update(id: number, article : ArticleUpdateDTO) {
    //     let index = this.list.findIndex(x => x.id == id)
    //     this.list[index].author = article.author
    //     this.list[index].content = article.content
    //     this.list[index].email = article.email
    // }

}
