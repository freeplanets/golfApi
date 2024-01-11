import { ApiProperty } from "@nestjs/swagger";
import { handicapHistory } from "src/database/db.interface";

export default class HandicapHistoryModel implements handicapHistory {
    @ApiProperty({
        description: '會員編號',
    })
    memberid: string;

    @ApiProperty({
        description: '會員名稱',
    })
    memberName: string;

    @ApiProperty({
        description: '球道組合',
    })
    course: string;

    @ApiProperty({
        description: '總桿',
    })
    gross: number;

    @ApiProperty({
        description: '調整後總桿'
    })
    grossAfterAdjust: number;

    @ApiProperty({
        description: '難度指數',
    })
    rating: number;

    @ApiProperty({
        description: '斜度指數'
    })
    slope: number;

    @ApiProperty({
        description: '差點微分',
    })
    hcpDiff: number;

    @ApiProperty({
        description: '均值',
    })
    hcpAvg: number;

    @ApiProperty({
        description: '差點指數',
    })
    hcpIndex: number;

    @ApiProperty({
        description: '球員球場差點',
    })
    hcpField: number;
}