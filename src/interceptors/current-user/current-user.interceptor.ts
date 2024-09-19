import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.entity';

// Le but de l'interceptor est de intercepter toute requête
// Vérifier s'il existe ou pas une clé userId dans la session
// Si ça existe, on récupère les informations de l'utilisateur
// On les stocke dans un nouvel objet " currentUser " dans la session
// Ce qui va permettre à notre décorateur currentUser de récupèrer l'objet lorsqu'on appele la route

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private _userService: UserService) {}

  //
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<User>> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {}
    console.log(request.session.userId);

    if (userId) {
      const user = await this._userService.findOne(userId)
      // Une fois le user retrouvé, on crée notre nouvel objet dans la session
      request.currentUser = user;
    }
    return next.handle();
  }
}
