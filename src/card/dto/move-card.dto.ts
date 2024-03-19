import { IsNotEmpty, IsNumber } from "class-validator";

export class MoveCardDto {
    @IsNumber()
    @IsNotEmpty({ message: '옮기고자 하는 카드의 아이디값을 입력해주세요' })
    order: number;
}
