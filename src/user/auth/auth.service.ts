import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserService } from '../user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
// randomBytes va servir à créer un morceau binaire d'une longueur que l'on va spécifier et qu'il faudra traduire
// _scrypt va servir à hasher une information --> le mdp. scrypt renvoi un callback

import { promisify } from 'util';
// Promisify va transformer un callback en promise

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signup(email: string, password: string, username: string) {
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException(
        'Un compte avec cet email existe déjà'
      )
    }

    // Hashing du password

    // Création d'un salt de 16 bytes
    // randomBytes va return un buffer de taille indiquée doublée
    // Nous allons devoir transformer cette valeur en un string hexadécimal --> grP415Xyifez
    const salt = randomBytes(8).toString('hex')

    // On combine le salt et password pour créer le hash qui va nous servir
    // Premier param : password
    // Deuxième param : salt
    // Troisième param : la taille désirée pour le hash
    // Pour aider typescript à comprendre de quel type est le hash, on alias
    const hash = (await scrypt(password, salt, 32)) as Buffer

    // Combiner le hash et le salt en rajoutant un '.' entre les deux
    // On sépare par un '.' pour différencier plus facilement le hash du salt
    const result = salt + '.' + hash.toString('hex');

    const user = this.userService.create(email, result, username )

    return user;
  }

  async signin(email: string, password: string, username: string) {
    const [user] = await this.userService.find(email);

    if (!user) {
      throw new NotFoundException('Cet utilisateur n\'existe pas');
    }

    const [salt, storedPassword] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedPassword !== hash.toString('hex')) {
      throw new BadRequestException('Mot de passe invalide')
    }

    return user;
  }
}
