import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { CardWorker } from 'src/card/types/worker.type';

@Injectable()
export class WorkersGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(private reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext) {
        const authenticated = await super.canActivate(context);
        if (!authenticated) {
            return false;
        }

        const requiredRoles = this.reflector.getAllAndOverride<CardWorker[]>('workers', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((worker) => user.worker === worker);
    }
}

// 작업자 리더인지 팀원인지 확인