import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AccessGuard implements CanActivate {
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session;

    console.log(request)
    if (userId !== 5) {
      return false
    }

    return true;
  }
}
