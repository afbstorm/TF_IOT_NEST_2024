import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  list : string[] = ["Salut les gens !"]

  getHello(): string {
    return 'Hello World!';
  }

  saveText(text : string) {
    this.list.push(text)
  }

  getByIndex(index : number) {
    return this.list[index]
  }

  update(index: number, text : string){
    this.list[index] = text
  }

}
