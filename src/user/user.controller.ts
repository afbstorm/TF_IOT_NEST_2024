import { Controller, Get, Session, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './DTOs/create-user.dto';
import { CurrentUser } from '../decorators/current-user/current-user.decorator';
import { User } from './user.entity';
import { AccessGuard } from '../guards/access/access.guard';

@Controller('user')
export class UserController {
    constructor(private userService : UserService, private authService: AuthService){}

    @Get('/moi')
    current(@CurrentUser() user: User) {
        console.log(user);
        return user;
    }

    @UseGuards(AccessGuard)
    @Get('/moibis')
    current2(@CurrentUser() user: User) {
        return user;
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const { username, email, password } = body;
        const user = await this.authService.signup(email, password, username);
        session.userId = user.id
        return user;
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const { email, password, username } = body;
        const user = await this.authService.signin(email, password, username)
        session.userId = user.id
        return user;
    }


    // @Get("/:id")
    // getById(@Param("id") id : number) {
    //     return this.userService.getById(id)
    // }
}
