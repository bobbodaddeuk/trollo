import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CardWorker } from 'src/worker/types/worker.type';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WORKERS_KEY } from 'src/worker/decorators/workers.decorator';
import { Member } from 'src/member/entities/member.entity';
import { Worker } from 'src/worker/entities/worker.entity';

@Injectable()
export class WorkersGuard extends JwtAuthGuard implements CanActivate {
    @InjectRepository(Worker)
    private readonly workerRepository: Repository<Worker>;
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


        const requiredWorkers = this.reflector.getAllAndOverride<CardWorker[]>(WORKERS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredWorkers) {
            return true;
        }

        const req = context.switchToHttp().getRequest();
        const userId = req.user.id;
        const user = await this.memberRepository.findOneBy({ userId: userId });
        const member = await this.workerRepository.findOne({ where: { member: { memberId: user.memberId } } })

        const hasPermission = requiredWorkers.some((workerRole) => member.workerRole === workerRole);

        if (!hasPermission) {
            throw new ForbiddenException('권한이 없습니다.');
        }

        return hasPermission;

    }
}

// 작업자 리더인지 팀원인지 확인