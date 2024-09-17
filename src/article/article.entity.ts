import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Article{
    //Primary key + identity
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:'varchar', length: 50})
    author:string

    @Column({type:'varchar', length: 250})
    content: string

    @Column({type:'varchar', length: 50})
    email:string
}