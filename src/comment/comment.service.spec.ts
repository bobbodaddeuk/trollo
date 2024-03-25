import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Card } from '../card/entities/card.entity';
import { List } from '../list/entities/list.entity';
import { Board } from '../board/entities/board.entity';
import { NotFoundException } from '@nestjs/common';

describe('CommentService', () => {
  let service: CommentService;
  let mockCommentRepository,
    mockCardRepository,
    mockListRepository,
    mockBoardRepository;

  beforeEach(async () => {
    mockCommentRepository = {
      findOneBy: jest.fn(),
      find: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    mockCardRepository = {
      findOneBy: jest.fn(),
    };

    mockListRepository = {
      findOneBy: jest.fn(),
    };

    mockBoardRepository = {
      findOneBy: jest.fn(),
    };
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: getRepositoryToken(Comment),
          useValue: mockCommentRepository,
        },
        {
          provide: getRepositoryToken(Card),
          useValue: mockCardRepository,
        },
        {
          provide: getRepositoryToken(List),
          useValue: mockListRepository,
        },
        {
          provide: getRepositoryToken(Board),
          useValue: mockBoardRepository,
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
  });
  describe('댓글 생성 테스트', () => {
    it('성공적인 댓글 생성', async () => {
      const sampleComment = {
        boardId: 1,
        listId: 2,
        cardId: 3,
        createCommentDto: { content: '테스트' },
      };

      mockBoardRepository.findOneBy.mockResolvedValue(null);
      mockListRepository.findOneBy.mockResolvedValue(null);
      mockCardRepository.findOneBy.mockResolvedValue(null);

      await expect(
        service.createComment(
          sampleComment.boardId,
          sampleComment.listId,
          sampleComment.cardId,
          sampleComment.createCommentDto,
        ),
      ).rejects.toThrow(NotFoundException);

      mockCommentRepository.create.mockReturnValue(
        sampleComment.createCommentDto,
      );
      mockCommentRepository.save.mockResolvedValue(
        sampleComment.createCommentDto,
      );

      const result = await service.createComment(
        sampleComment.boardId,
        sampleComment.listId,
        sampleComment.cardId,
        sampleComment.createCommentDto,
      );
      expect(result).toEqual(sampleComment.createCommentDto);
      expect(mockCommentRepository.create).toHaveBeenCalledWith(
        sampleComment.createCommentDto,
      );
      expect(mockCommentRepository.create).toHaveBeenCalledTimes(1);
      expect(mockCommentRepository.save).toHaveBeenCalledWith(
        sampleComment.createCommentDto,
      );
      expect(mockCommentRepository.save).toHaveBeenCalledTimes(1);
    });
  });
  // describe('댓글 조회 테스트', () => {

  // })
});
