import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListDto, FindListDto } from './dto/create-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private ListRepository: Repository<List>,
  ) {}
  async createList(createListDto: CreateListDto) {
    const newList = await this.ListRepository.save(createListDto);
    return newList;
  }

  async changeListTitle(findListDto: FindListDto, listId: number) {
    const list = await this.ListRepository.findOne({
      where: { listId },
    });
    if (!list) {
      throw new NotFoundException(`해당하는 컬럼이 존재하지 않습니다.`);
    }
    // list의 타이틀을 변경된 것을 DB에 넣어야함
    const updatedListTitle = await this.ListRepository.update(
      findListDto,
      list,
    );
    return updatedListTitle;
  }
}
