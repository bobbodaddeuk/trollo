import { Controller, Post, Body } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';

@Controller('/list/:boardId')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post('/column')
  // 클라이언트가 body에 담아서 보내야 하는 것
  create(@Body() createListDto: CreateListDto) {
    return this.listService.createList(createListDto);
  }
}
