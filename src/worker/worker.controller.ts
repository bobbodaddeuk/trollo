import {
    Controller,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    HttpStatus,
} from '@nestjs/common';
import { WorkerService } from './worker.service';
import { BoardMemberGuard } from 'src/board/guards/board-member.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { WorkersGuard } from 'src/worker/guards/workers.guard';
import { Workers } from 'src/worker/decorators/workers.decorator';
import { CardWorker } from './types/worker.type';
import { AddWorkerDto } from './dto/add-worker.dto';
import { DeleteWorkerDto } from './dto/delete-member.dto';

@UseGuards(JwtAuthGuard)
@UseGuards(BoardMemberGuard)
@UseGuards(WorkersGuard)
@Controller('worker')
export class WorkerController {
    constructor(private readonly workerService: WorkerService) { }

    //작업자 수정(o)
    //카드 생성했던 leader만 가능
    @Workers(CardWorker.Leader)
    @Post(':cardId')
    async addWorker(@Param('cardId') cardId: number, @Body() addWorkerDto: AddWorkerDto) {
        const worker = await this.workerService.addWorker(cardId, addWorkerDto.memberId);

        return {
            statusCode: HttpStatus.OK,
            message: '해당 카드에 작업자를 추가하였습니다.',
            worker,
        };
    }

    //작업자 삭제(o)
    //카드 생성했던 leader만 가능
    @Workers(CardWorker.Leader)
    @Delete(':cardId')
    async deleteWorker(@Param('cardId') cardId: number, @Body() deleteWorkerDto: DeleteWorkerDto) {
        const worker = await this.workerService.deleteWorker(cardId, deleteWorkerDto.memberId);

        return {
            statusCode: HttpStatus.OK,
            message: '해당 카드에서 작업자를 삭제하였습니다.',
            worker,
        };

    }
}
