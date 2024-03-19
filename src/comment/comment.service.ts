import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Card } from 'src/card/entities/card.entity';
import { List } from 'src/list/entities/list.entity';
import { Board } from 'src/board/entities/board.entity';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}
  // 댓글 달기
  async createComment(
    boardId: number,
    listId: number,
    cardId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const board = await this.boardRepository.findOneBy({ boardId });
    if (!board)
      throw new NotFoundException('해당하는 게시판을 찾을 수 없습니다.');
    const list = await this.listRepository.findOneBy({ listId });
    if (!list)
      throw new NotFoundException('해당하는 리스트를 찾을 수 없습니다.');
    const card = await this.cardRepository.findOneBy({ cardId });
    if (!card) throw new NotFoundException('해당하는 카드를 찾을 수 없습니다.');

    const comment = this.commentRepository.create({
      content: createCommentDto.content,
      board,
      list,
      card,
    });
    await this.commentRepository.save(comment);
    return comment;
  }
  // 댓글 조회
  async findAllComment(boardId: number, listId: number, cardId: number) {
    const board = await this.boardRepository.findOneBy({ boardId });
    if (!board)
      throw new NotFoundException('해당하는 게시판을 찾을 수 없습니다.');
    const list = await this.listRepository.findOneBy({ listId });
    if (!list)
      throw new NotFoundException('해당하는 리스트를 찾을 수 없습니다.');
    const card = await this.cardRepository.findOneBy({ cardId });
    if (!card) throw new NotFoundException('해당하는 카드를 찾을 수 없습니다.');

    const comments = this.commentRepository.find({
      where: {
        board: { boardId },
        list: { listId },
        card: { cardId },
      },
    });
    return comments;
  }

  // 댓글 수정
  async updateComment(boardId: number, listId: number, cardId: number) {
    const board = await this.boardRepository.findOneBy({ boardId });
    if (!board)
      throw new NotFoundException('해당하는 게시판을 찾을 수 없습니다.');
    const list = await this.listRepository.findOneBy({ listId });
    if (!list)
      throw new NotFoundException('해당하는 리스트를 찾을 수 없습니다.');
    const card = await this.cardRepository.findOneBy({ cardId });
    if (!card) throw new NotFoundException('해당하는 카드를 찾을 수 없습니다.');
  }

  // 댓글 삭제
  async deleteComment(boardId: number, listId: number, cardId: number) {
    const board = await this.boardRepository.findOneBy({ boardId });
    if (!board)
      throw new NotFoundException('해당하는 게시판을 찾을 수 없습니다.');
    const list = await this.listRepository.findOneBy({ listId });
    if (!list)
      throw new NotFoundException('해당하는 리스트를 찾을 수 없습니다.');
    const card = await this.cardRepository.findOneBy({ cardId });
    if (!card) throw new NotFoundException('해당하는 카드를 찾을 수 없습니다.');
  }
}
