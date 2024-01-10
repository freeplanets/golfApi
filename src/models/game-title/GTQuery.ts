import { ApiProperty } from "@nestjs/swagger";
import { gameTitle } from "../../database/db.interface";
import { IsDateString, IsString } from "class-validator";

export default class GTQuery implements Partial<gameTitle> {
    @ApiProperty({
        description: '名稱',
    })
    @IsString()
    titleName?: string;

    @ApiProperty({
        description:'開始日期',
    })
    @IsDateString()
    gameStart?: string;

    @ApiProperty({
        description: '結束日期',
    })
    @IsDateString()
    gameEnd?: string;

    @ApiProperty({
        description: '賽制名稱',
    })
    @IsString()
    cfName?: string;
}