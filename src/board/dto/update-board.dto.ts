import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  boardName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  description: string;
}
