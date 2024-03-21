import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { List } from 'src/list/entities/list.entity';
import { Board } from 'src/board/entities/board.entity';
import { Card } from 'src/card/entities/card.entity';
import { User } from 'src/user/entities/user.entity';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
    const comments = await this.commentRepository.find({
      where: {
        board: { boardId },
        list: { listId },
        card: { cardId },
      },
    });
    if (comments.length === 0) {
      return { message: '댓글이 존재하지 않습니다.' };
    }
    return comments;
  }

  // 댓글 수정
  async updateComment(
    boardId: number,
    listId: number,
    cardId: number,
    commentId: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const board = await this.boardRepository.findOneBy({ boardId });
    if (!board)
      throw new NotFoundException('해당하는 게시판을 찾을 수 없습니다.');

    const list = await this.listRepository.findOneBy({ listId });
    if (!list)
      throw new NotFoundException('해당하는 리스트를 찾을 수 없습니다.');

    const card = await this.cardRepository.findOneBy({ cardId });
    if (!card) throw new NotFoundException('해당하는 카드를 찾을 수 없습니다.');
    const { content } = updateCommentDto;
    const comment = await this.commentRepository.findOne({
      where: {
        commentId: commentId,
        board: { boardId },
        list: { listId },
        card: { cardId },
      },
    });
    if (!comment) {
      throw new NotFoundException('해당하는 댓글을 찾을 수 없습니다.');
    }

    comment.content = content;
    await this.commentRepository.save(comment);

    return comment;
  }

  // 댓글 삭제
  async deleteComment(
    boardId: number,
    listId: number,
    cardId: number,
    commentId: number,
  ): Promise<{ message: string }> {
    const board = await this.boardRepository.findOneBy({ boardId });
    if (!board)
      throw new NotFoundException('해당하는 게시판을 찾을 수 없습니다.');

    const list = await this.listRepository.findOneBy({ listId });
    if (!list)
      throw new NotFoundException('해당하는 리스트를 찾을 수 없습니다.');

    const card = await this.cardRepository.findOneBy({ cardId });
    if (!card) throw new NotFoundException('해당하는 카드를 찾을 수 없습니다.');
    const result = await this.commentRepository.delete({
      commentId,
    });
    if (result.affected === 0) {
      throw new NotFoundException('해당하는 댓글을 찾을 수 없습니다.');
    }

    return { message: '댓글이 성공적으로 삭제되었습니다.' };
  }
}
