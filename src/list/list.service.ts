import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { List } from './list.model';

@Injectable()
export class ListService {
  createList(createListDto: CreateListDto) {
    const { title } = createListDto;

    const list: List = {
      title,
    };
    return list;
  }
}
