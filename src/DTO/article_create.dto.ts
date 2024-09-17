import { IsEmail, IsInt, IsNotEmpty, Length, Min } from "class-validator"

export class ArticleCreateDTO {
    
    @IsInt({message : 'Obligation d\'entrer un entier'})
    @IsNotEmpty()
    @Min(1)
    id : number
    
    @IsNotEmpty()
    @Length(2, 15)
    author : string
    
    @Length(10)
    content : string

    @IsEmail()
    email: string

}