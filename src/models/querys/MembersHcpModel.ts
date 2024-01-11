import { ApiProperty } from "@nestjs/swagger";
import { membersHcp } from "../../database/db.interface";

export default class MembersHcpModel implements membersHcp {
    @ApiProperty({
        description: '會員編號',
    })
    memberid: string;

    @ApiProperty({
        description: '會員名稱',
    })
    name: string;

    @ApiProperty({
        description: '最近差點',
    })
    lastHandicap: number;
}