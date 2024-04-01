import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { competitionRanking } from "../../database/db.interface";

export default class CompetitionRankingQueryModel implements Partial<competitionRanking> {
    @ApiProperty({
        description: '球場代號',
    })
    @IsString()
    siteid?: string;

    @ApiProperty({
        description: '賽事名稱',
    })
    @IsString()
    titleName?: string;
}   