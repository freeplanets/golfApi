import { ApiProperty } from "@nestjs/swagger";
import { competition, notCountingHoles } from "../../database/db.interface";
import { IsDateString, IsNumber, IsString } from "class-validator";
import NotCountingHolesModel from "./NotCountingHolesModel";

export default class CompetitionModel implements competition {
    @ApiProperty({
        description: 'hashkey',
        required: false,
    })
    @IsString()
    titleid?: string;

    @ApiProperty({
        description: '名稱',
    })
    @IsString()
    titleName: string;

    @ApiProperty({
        description:'開始日期',
    })
    @IsDateString()
    gameStart: string;

    @ApiProperty({
        description: '結束日期',
    })
    @IsDateString()
    gameEnd: string;

    @ApiProperty({
        description: '賽制代號',
    })
    @IsString()
    cfid: string;

    @ApiProperty({
        description: '賽制名稱',
    })
    @IsString()
    cfName: string;

    @ApiProperty({
        description: '不計洞號',
        type: [NotCountingHolesModel],
        required: false,
    })
    notCountingHoles?: notCountingHoles[];

    @ApiProperty({
        description: '總桿獎數',
    })
    @IsNumber()
    grossCounter: number;

    @ApiProperty({
        description: '淨桿獎數',
    })
    @IsNumber()
    netCounter: number;

    @ApiProperty({
        description: '比賽球場代號',
        required: false,
    })
    @IsString()
    competitionLocation?: string;
}