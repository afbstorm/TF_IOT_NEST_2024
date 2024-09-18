import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { ArticleCreateDTO } from './DTO/article_create.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get("/:index")
  // getByIndex(@Param("index") index: number) {
  //   return this.appService.getByIndex(index)
  // }

  @Post()
  add(@Body() text:string){
    this.appService.saveText(text)
  }

  @Put("/:index")
  put(@Param("index") index:number, @Body() text : string){
    this.appService.update(index, text)
  }

  
}
