import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  boardName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  description: string;
}
