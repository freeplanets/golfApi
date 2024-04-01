import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";
import { notCountingHole } from "../../database/db.interface";

export default class NotCountingHolesModel implements notCountingHole {
    @ApiProperty({
        description: '球場分區代號',
    })
    @IsString()
    zoneid: string;

    @ApiProperty({
        description: '球道代號',
        type: [Number],
    })
    @IsArray()
    fairways: number[];
}