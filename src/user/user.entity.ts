import { Article } from "src/article/article.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column({length : 50, type:'varchar'})
    username:string

    @Column({length : 100, type:'varchar'})
    email:string

    @OneToMany(type => Article, article => article.author)
    articles : Article[]
}