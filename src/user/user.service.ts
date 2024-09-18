import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepo : Repository<User>){}

    // getById(id:number) : Promise<User> {
    //     return this.userRepo
    //     .createQueryBuilder("user").where({id : id})
    //     .leftJoinAndSelect("user.articles", "article")
    //     .getOne()
    // }

    getById(id:number) : Promise<User> {
        return this.userRepo
        .findOne({where : {id : id}, relations : {articles : true}})
    }

}
