import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Member } from 'src/member/entities/member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardMemberGuard extends JwtAuthGuard implements CanActivate {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authenticated = await super.canActivate(context);
    if (!authenticated) {
      throw new UnauthorizedException('인증 정보가 잘못되었습니다.');
    }

    const req = context.switchToHttp().getRequest();
    const userId = req.user.id;
    const boardId = req.params.boardId; // Convert boardId to number

    console.log('boardmemberguard: userId, boardId', userId, boardId);

    const member = await this.memberRepository.findOneBy({
      userId,
      boardId,
    });
    console.log('member: ', member);
    if (!member) {
      throw new ForbiddenException('해당 보드의 멤버가 아닙니다.');
    }

    return true;
  }
}
