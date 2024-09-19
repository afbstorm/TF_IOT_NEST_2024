import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Le but de ce décorateur va être d'afficher les informations du user courant.
// Ces informations vont être récupérées depuis l'objet currentUser de la session

export const CurrentUser = createParamDecorator(
  // le data est le paramètre qui va définir le type de paramètre que le décorateur peut recevoir.
  // Ici never va tout simplement empêcher l'insertion d'un paramètre
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  }
)
