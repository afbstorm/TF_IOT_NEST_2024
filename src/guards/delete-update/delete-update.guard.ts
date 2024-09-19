import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class DeleteUpdateGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const {userId} = request.session;
    const {id} = request.params;

    if (userId !== parseInt(id)) {
      return false
    }

    return true;
  }
}
