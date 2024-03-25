import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberGrade } from 'src/member/type/grade.type';
import { Member } from 'src/member/entities/member.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GRADES_KEY } from '../decorators/grade.decorator';

@Injectable()
export class GradesGuard extends JwtAuthGuard implements CanActivate {
  @InjectRepository(Member)
  private readonly memberRepository: Repository<Member>;

  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authenticated = await super.canActivate(context);

    if (!authenticated) {
      throw new UnauthorizedException('인증 정보가 잘못되었습니다.');
    }

    const requiredGrades = this.reflector.getAllAndOverride<MemberGrade[]>(
      GRADES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredGrades) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const userId = req.user.id;
    const user = await this.memberRepository.findOneBy({ userId: userId });
    const hasPermission = requiredGrades.some((grade) => grade === user.grade);

    if (!hasPermission) {
      throw new ForbiddenException('권한이 없습니다.');
    }

    return hasPermission;
  }
}
