import { CreateBoardDto } from './create-board.dto';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @ApiProperty({ example: '예시보드이름' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  boardName: string;

  @ApiProperty({ example: '보드에 대한 설명 예시' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  description: string;
}
