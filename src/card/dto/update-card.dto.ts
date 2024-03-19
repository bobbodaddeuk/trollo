import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString, isEnum } from "class-validator";
import { CardWorker } from "../types/card.type";

export class UpdateCardDto {
    @IsString()
    @IsNotEmpty({ message: '카드의 이름(할 일)을 입력해주세요.' })
    title: string;

    @IsString()
    @IsNotEmpty({ message: '카드의 내용을 입력해주세요.' })
    content: string;

    @IsDateString()
    @IsNotEmpty({ message: '카드 마감기한을 입력해주세요.' })
    deadline: Date;
}