import { IsEmail, IsInt, IsNotEmpty, Length, Min } from "class-validator"

export class ArticleUpdateDTO {
    
    @IsNotEmpty()
    @Length(2, 15)
    author : string
    
    @Length(10)
    content : string

    @IsEmail()
    email: string

}