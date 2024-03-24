import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { UpdatedListDto } from './dto/update-list.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private ListRepository: Repository<List>,
  ) {}
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
    const list = await this.ListRepository.save({
      title,
      userId: id,
      index: nextIndex,
      boardId,
    });

    return {
      status: HttpStatus.CREATED,
      message: `새로운 컬럼이 생성되었습니다.`,
      result: list,
    };
  }

  // 컬럼 제목 변경
  async changeListTitle(
    updateListDto: UpdatedListDto,
    listId: number,
    boardId: number,
  ) {
    // 찾고 싶은 게시물을 listId를 통해서 찾아준다.
    // const list = await this.ListRepository.findOne({
    //   where: { listId },
    // });
    const { title } = updateListDto;
    console.log('boardId', boardId);
    console.log(listId);
    console.log(title);

    const changedListTitle = await this.ListRepository.save({
      boardId,
      listId,
      title,
    });
    if (!changedListTitle) {
      throw new NotFoundException(`해당하는 컬럼이 존재하지 않습니다.`);
    }
    return {
      status: HttpStatus.OK,
      message: `${changedListTitle.listId}번 컬럼 제목이 정상적으로 변경되었습니다.`,
      result: changedListTitle,
    };
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
  async changeListPosition(listId: number, hopeindex: number) {
    // 이동 시킬 컬럼 1개 찾음
    const selectedlist = await this.ListRepository.findOneBy({ listId });

    if (!selectedlist) {
      throw new NotFoundException(`해당하는 컬럼이 존재하지 않습니다.`);
    }
    let startIndex: number;
    let lastIndex: number;
    let add: number;
    // 선택한 컬럼의 인덱스를 뒤로 이동시키는 경우,
    // 현재 컬럼 바로 뒤에 있는 컬럼부터 이동하고자 하는 인덱스가 있는 컬럼까지 한 칸씩 앞으로 당겨줌
    if (selectedlist.index < hopeindex) {
      startIndex = selectedlist.index + 1;
      lastIndex = hopeindex;
      add = -1;
    } else {
      // 선택한 컬럼의 인덱스를 앞으로 이동시키는 경우,
      // 이동하고자 하는 인덱스부터 현재 인덱스 바로 앞까지 한 칸씩 뒤로 밀어줌
      startIndex = hopeindex;
      lastIndex = selectedlist.index - 1;
      add = 1;
    }
    //
    const indexArr: Array<number> = [];
    for (let i = startIndex; i <= lastIndex; i++) {
      indexArr.push(i);
    }
    // 옮길 리스트를 찾음
    const lists = await this.ListRepository.find({
      where: { index: In(indexArr) },
    });

    // console.log('가나다라', indexArr, startIndex, lastIndex);
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
