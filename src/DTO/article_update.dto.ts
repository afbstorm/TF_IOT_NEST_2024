import { IsEmail, IsInt, IsNotEmpty, Length, Min } from "class-validator"
import { User } from "src/user/user.entity"

export class ArticleUpdateDTO {
    
    @IsNotEmpty()
    // @Length(2, 15)
    author : User
    
    @Length(10)
    content : string

    @IsEmail()
    email: string

}