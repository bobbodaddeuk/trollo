import { IsDateString, IsNotEmpty, IsNumber, IsString, isEnum } from "class-validator";
import { CardWorker } from "../types/card.type";
import { Card } from "../entities/card.entity";

export class CreateCardDto {
    @IsString()
    @IsNotEmpty({ message: '카드의 이름(할 일)을 입력해주세요.' })
    title: string;

    @IsString()
    @IsNotEmpty({ message: '카드의 내용을 입력해주세요.' })
    content: string;

    @IsDateString()
    @IsNotEmpty({ message: '카드 마감기한을 입력해주세요.' })
    deadline: Date;

    //@isEnum(CardWorker)
    @IsNotEmpty({ message: '해당 카드의 작업자를 입력해주세요.' })
    worker: CardWorker;
}
