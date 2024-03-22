import { IsNotEmpty, IsNumber } from "class-validator";

export class MoveCardDto {
    @IsNumber()
    @IsNotEmpty({ message: '옮기고자 하는 카드의 listId값을 입력해주세요' })
    listOrder: number;

    @IsNumber()
    @IsNotEmpty({ message: '옮기고자 하는 카드의 cardId값을 입력해주세요.' })
    cardOrder: number;
}