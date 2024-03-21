import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
// import { CreateBoardDto } from 'src/board/dto/create-board.dto';
import { UpdatedListDto } from './dto/update-list.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private ListRepository: Repository<List>,
  ) {}

  // 컬럼 1개 찾기

  // 컬럼 생성
  async createList(createListDto: CreateListDto, user: User) {
    const { title } = createListDto;
    const { id } = user;
    const newList = await this.ListRepository.save({
      title,
      userId: id,
    });
    return newList.title;
  }

  // 컬럼 제목 변경
  async changeListTitle(
    updateListDto: UpdatedListDto,
    listId: number,
    user: User,
  ) {
    // 찾고 싶은 게시물을 listId를 통해서 찾아준다.
    const { id } = user;
    const list = await this.ListRepository.findOne({
      where: { listId, userId: id },
    });
    if (!list) {
      throw new NotFoundException(`해당하는 컬럼이 존재하지 않습니다.`);
    }
    // 레포지토리에 업데이트를 해줘야함
    await this.ListRepository.update({ listId, userId: id }, updateListDto);

    // list의 타이틀을 변경된 것을 DB에 넣어야함
    const changedListTitle = await this.ListRepository.findOne({
      where: {
        listId,
        userId: id,
      },
    });

    if (changedListTitle) {
      return {
        status: HttpStatus.OK,
        message: `${listId}번 컬럼 제목이 정상적으로 변경되었습니다.`,
        result: changedListTitle,
      };
    }
    // return changedListTitle;
  }

  // 컬럼 삭제하기
  async deleteList(listId: number, user: User) {
    const { id } = user;
    const list = await this.ListRepository.findOne({
      where: { listId, userId: id },
    });
    if (!list) {
      throw new NotFoundException(`해당하는 컬럼이 존재하지 않습니다.`);
    }
    const deleteList = await this.ListRepository.delete({ listId, userId: id });
    if (deleteList) {
      return {
        status: HttpStatus.OK,
        message: `${listId}번 컬럼이 정상적으로 삭제되었습니다.`,
        result: deleteList,
      };
    }
  }
}
