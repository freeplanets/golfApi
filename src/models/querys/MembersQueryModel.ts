import { ApiProperty } from "@nestjs/swagger";
import { membersHcp } from "../../database/db.interface";
import { IsString } from "class-validator";

export default class MembersQueryModel implements Partial<membersHcp> {
    /*
    @ApiProperty({
        description: '球場代號',
    })
    @IsString()
    siteid?: string;
    */

    @ApiProperty({
        description: '會員代號',
    })
    @IsString()
    memberid?: string;

    @ApiProperty({
        description: '會員名稱',
    })
    @IsString()
    name?: string;
}