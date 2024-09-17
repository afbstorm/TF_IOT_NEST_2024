import { IsEmail, IsInt, IsNotEmpty, Length, Min } from "class-validator"

export class ArticleCreateDTO {
    
    
    
    @IsNotEmpty()
    @Length(2, 15)
    author : string
    
    @Length(10)
    content : string

    @IsEmail()
    email: string

}