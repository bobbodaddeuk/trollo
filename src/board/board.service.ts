import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}
  // 보드 생성
  async create(createBoardDto: CreateBoardDto) {
    const { boardName, description } = createBoardDto;
    const board = await this.boardRepository.save({ boardName, description });
    return board;
  }
  // 내가 생성한 보드 목록 조회
  async findAll(user: User) {
    const { id } = user;
    return await this.boardRepository.find({ where: { userId: id } });
  }
  // 내가 멤버로 속한 보드 목록 조회
  async findAllMyTeamProject(user: User) {
    const { id } = user;

    const findAllMyProject = await this.boardRepository.find({
      relations: { member: true },
      where: {
        member: {
          userId: id,
        },
      },
    });

    return findAllMyProject;
  }
  // 보드 상세 조회
  async findOne(boardId: number) {
    const findBoard = await this.boardRepository.findOne({
      where: { boardId },
    });

    if (!findBoard) {
      throw new NotFoundException('해당 보드가 존재하지 않습니다.');
    }

    return findBoard;
  }
  // 보드 수정
  async update(boardId: number, updateBoardDto: UpdateBoardDto) {
    await this.findOne(boardId);

    const { boardName, description } = updateBoardDto;

    return await this.boardRepository.update(boardId, {
      boardName,
      description,
    });
  }
  // 보드 삭제
  async remove(boardId: number) {
    await this.findOne(boardId);
    return this.boardRepository.delete(boardId);
  }
}
