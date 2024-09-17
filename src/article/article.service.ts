import { Injectable } from '@nestjs/common';
import { ArticleCreateDTO } from 'src/DTO/article_create.dto';
import { ArticleUpdateDTO } from 'src/DTO/article_update.dto';

@Injectable()
export class ArticleService {
    list: ArticleCreateDTO[] = []

    create(newArticle : ArticleCreateDTO){
        this.list.push(newArticle)
    }

    getAll() : ArticleCreateDTO[] {
        return this.list
    }

    getById(id : number) : ArticleCreateDTO {
        return this.list.find(x => x.id == id)
    }

    delete(id:number) {
        let index = this.list.findIndex(x => x.id == id)
        this.list.splice(index, 1)
    }

    update(id: number, article : ArticleUpdateDTO) {
        let index = this.list.findIndex(x => x.id == id)
        this.list[index].author = article.author
        this.list[index].content = article.content
        this.list[index].email = article.email
    }

}
