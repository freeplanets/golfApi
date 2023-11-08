import { ApiProperty } from "@nestjs/swagger";
import { gameResultReq } from "../if"
import { IsDate, IsString } from "class-validator";

export default class gameResultRequest implements gameResultReq {
    @ApiProperty({
        description: '球場代號',
        required: true,
    })
    @IsString()
    siteid: string;

    @ApiProperty({
        description: '開始日期',
        required: true,
    })
    @IsString()
    @IsDate()    
    dateStart: string;

    @ApiProperty({
        description: '結束日期',
        required: true,
    })
    @IsString()
    @IsDate()
    dateEnd: string;

    @ApiProperty({
        description: '來賓姓名',
        required: false
    })
    @IsString()
    playerName?: string;

    @ApiProperty({
        description: '球隊/賽事名稱',
        required: false,
    })
    @IsString()
    gameTitle?: string;
}