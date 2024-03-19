import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Member } from 'src/member/entities/member.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    const { boardName, description } = createBoardDto;
    const board = await this.boardRepository.save({ boardName, description });
    return board;
  }

  async findAll(userId) {
    return await this.boardRepository.find({ where: userId });
  }

  async findAllMyTeamProject(userId) {
    const findAllMyProject = await this.boardRepository.find({
      relations: { member: true },
      where: {
        member: {
          userId: userId,
        },
      },
    });

    return findAllMyProject;
  }

  async findOne(boardId: number) {
    const findBoard = await this.boardRepository.findOne({
      where: { boardId },
    });

    if (!findBoard) {
      throw new NotFoundException('');
    }

    return findBoard;
  }

  async update(boardId: number, updateBoardDto: UpdateBoardDto) {
    await this.findOne(boardId);

    const { boardName, description } = updateBoardDto;

    return await this.boardRepository.update(boardId, {
      boardName,
      description,
    });
  }

  async remove(boardId: number) {
    await this.findOne(boardId);
    return this.boardRepository.delete(boardId);
  }
}
