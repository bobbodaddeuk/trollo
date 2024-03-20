import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Board } from 'src/board/entities/board.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}
  // 유저 존재 유무 확인
  async existedUser(id: number) {
    const existedUser = await this.userRepository.findOne({
      where: { id },
    });

    if (!existedUser) {
      throw new NotFoundException('해당 사용자가 존재하지 않습니다.');
    }

    return existedUser;
  }
  // 보드에 유저 초대
  async create(createMemberDto: CreateMemberDto, boardId: number) {
    const { id, grade } = createMemberDto;

    await this.existedUser(id);

    const inviteInBoard = await this.memberRepository.save({
      id,
      grade,
      boardId,
    });

    return inviteInBoard;
  }
  // 보드의 모든 멤버 조회
  async findAll(boardId: number) {
    const boardWorkers = await this.memberRepository.find({
      where: { boardId },
      select: { memberId: true },
    });
    return boardWorkers;
  }
  // 보드 멤버 조회
  async existMember(memberId: number) {
    const findBoardMember = await this.memberRepository.findOne({
      where: { memberId },
    });

    if (!findBoardMember) {
      throw new NotFoundException('초대된 사용자가 아닙니다.');
    }

    return findBoardMember;
  }
  // 보드 멤버의 권한 수정
  async update(memberId: number, updateMemberDto: UpdateMemberDto) {
    const existMember = await this.existMember(memberId);
    const { grade } = updateMemberDto;
    const updateMember = await this.memberRepository.update(
      existMember.memberId,
      { grade },
    );

    return updateMember;
  }
  // 보드 멤버 삭제
  async remove(memberId: number) {
    return await this.memberRepository.delete({ memberId });
  }
}
