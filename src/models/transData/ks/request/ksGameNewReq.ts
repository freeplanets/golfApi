import { ApiProperty } from "@nestjs/swagger";
import { ksGameNew } from "../ks.interface";
import { IsArray, IsString } from "class-validator";

export default class ksGameNewReq implements ksGameNew {
    @ApiProperty({
        description: '編組資料Key值',
        type: String,
    })
    @IsString()
    key: string;

    @ApiProperty({
        description: '組別代號',
        type: String,
    })
    @IsString()    
    group_no: string;

    @ApiProperty({
        description: '球區資料',
        type: [String],
    })
    @IsArray()
    areas: string[];

    @ApiProperty({
        description: '桿弟資料',
        type: [String],
    })
    @IsArray()
    caddie: string[];

    @ApiProperty({
        description: '來賓資料',
        type: [String],
    })
    @IsArray()
    player: string[];

    @ApiProperty({
        description: '來賓資料',
        type: [String],
    })
    @IsArray()
    player_id: string[];

    @ApiProperty({
        description: '球隊名稱',
        type: String,
    })
    @IsString()    
    team: string;

    @ApiProperty({
        description: '球隊編號',
        type: String,
    })
    @IsString()
    team_id: string;
}