import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Member } from 'src/member/entities/member.entity';
import { Board } from './entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Member, Board])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
