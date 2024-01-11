import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";
import { competitionRanking } from "src/database/db.interface";

export default class CompetitionRankingQueryModel implements Partial<competitionRanking> {
    @ApiProperty({
        description: '賽事名稱',
    })
    @IsString()
    titleName?: string;

    @ApiProperty({
        description: '是否得獎',
        required: false,
    })
    @IsBoolean()
    trophy?: boolean;
}   