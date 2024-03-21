import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Member } from 'src/member/entities/member.entity';
import { Board } from './entities/board.entity';
import { PassportModule } from '@nestjs/passport';
import { BoardMemberGuard } from './guards/board-member.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User, Member, Board]), PassportModule],
  controllers: [BoardController],
  providers: [BoardService, BoardMemberGuard],
})
export class BoardModule {}
