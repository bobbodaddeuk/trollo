import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { User } from 'src/user/entities/user.entity';
import { Member } from 'src/member/entities/member.entity';
import { MemberGrade } from 'src/member/type/grade.type';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    private dataSource: DataSource,
  ) {}
  // 보드 생성
  async create(createBoardDto: CreateBoardDto, user: User) {
    const { boardName, description } = createBoardDto;
    console.log(createBoardDto);
    const { id } = user;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const board = await queryRunner.manager.getRepository(Board).save({
        boardName,
        description,
        userId: id,
      });

      const { boardId } = board;

      await queryRunner.manager
        .getRepository(Member)
        .save({ userId: id, boardId: boardId, grade: MemberGrade.OWNER });

      await queryRunner.commitTransaction();
      return board;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
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
