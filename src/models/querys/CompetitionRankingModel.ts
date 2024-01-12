import { ApiProperty } from "@nestjs/swagger";
import { competitionRanking } from "../../database/db.interface";

export default class CompetitionRankingModel implements Partial<competitionRanking> {
    @ApiProperty({
        description: '賽事名稱',
    })
    titleName: string;

    @ApiProperty({
        description: '球員編號',
    })
    memberid: string;

    @ApiProperty({
        description: '球員名稱',
    })
    memberName: string;

    @ApiProperty({
        description: '總桿',
    })
    gross: number;

    @ApiProperty({
        description: '淨桿',
    })
    net: number;

    @ApiProperty({
        description: '總桿排名',
    })
    grossRanking?: number;

    @ApiProperty({
        description: '淨桿排名',
    })
    netRankgin?: number;

    @ApiProperty({
        description: '是否得獎',
    })
    trophy?: boolean;
}