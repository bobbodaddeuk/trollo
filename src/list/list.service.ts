import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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
  async createList(createListDto: CreateListDto, user: User, boardId: number) {
    const { title } = createListDto;
    const { id } = user;
    // 같은 보드에 있는 list 찾기
    const lists = await this.ListRepository.find({
      where: { boardId },
      order: { index: 'ASC' },
    });
    let nextIndex: number;

    if (lists.length === 0) {
      nextIndex = 1;
    } else {
      nextIndex = lists[lists.length - 1].index + 1;
    }
    //
    const newList = await this.ListRepository.save({
      title,
      userId: id,
      index: nextIndex,
      boardId,
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

  // 컬럼 위치 이동
  // 이동 시킬 컬럼 1개 찾아야함
  async changeListPosition(listId: number, hopeindex: number) {
    // 움직이고 싶은 리스트
    const selectedlist = await this.ListRepository.findOneBy({ listId });
    if (!selectedlist) {
      throw new NotFoundException(`해당하는 컬럼이 존재하지 않습니다.`);
    }

    let startIndex: number;
    let lastIndex: number;
    let add: number;

    if (selectedlist.index < hopeindex) {
      startIndex = selectedlist.index + 1;
      lastIndex = hopeindex;
      add = -1;
    } else {
      startIndex = hopeindex;
      lastIndex = selectedlist.index - 1;
      add = 1;
    }
    const indexArr: Array<number> = [];
    for (let i = startIndex; i <= lastIndex; i++) {
      indexArr.push(i);
    }
    // 옮길 리스트를 찾음
    const lists = await this.ListRepository.find({
      where: { index: In(indexArr) },
    });
    console.log('가나다라', indexArr, startIndex, lastIndex);
    // 옮기는 부분(1칸 씩)
    for (const list of lists) {
      await this.ListRepository.update(
        { listId: list.listId },
        { index: list.index + add },
      );
    }
    await this.ListRepository.update(
      { listId: selectedlist.listId },
      { index: hopeindex },
    );

    return await this.ListRepository.find({ order: { index: 'ASC' } });
  }
}
