import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    // @InjectRepository va aider le système d'injection de dépendances de Nestjs à comprendre
    // quelle instance de Repository<User> doit être injectée lors de l'appel du service
    constructor(@InjectRepository(User) private readonly userRepo : Repository<User>){}

    // Create() et Save() vont tous les deux permettre de créer une représentation de quelque chose
    // Create() va créer cette représentation mais ne va pas l'injecter dans la DB
    // Save() récupérer la représentation créer par le Create() ET va la stocker dans la DB
    create(email: string, password: string, username: string): Promise<User> {
        const user = this.userRepo.create({email, password, username})
        return this.userRepo.save(user);
    }

    find(email: string) {
        return this.userRepo.find({where: {email}});
    }

    findOne(id: number) {
        // findOneBy return un et un seul élément ou aucun si rien ne satisfait la requête
        return this.userRepo.findOneBy({id})
        // return {username, email, id, ...}
    }



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
