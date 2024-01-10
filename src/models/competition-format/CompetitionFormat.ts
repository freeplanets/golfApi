import { competitionFormat } from "../../database/db.interface";
import CFKeyModel from "./CFKey"
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export default class CompetitionFormatModel extends CFKeyModel implements competitionFormat {
    @ApiProperty({
        description: '賽制名稱',
        type: String,
    })
    @IsString()
    cfName: string;

    @ApiProperty({
        description: '不計分洞數',
        type: Number,
    })
    @IsNumber()
    notCountingHoles: number;

    @ApiProperty({
        description: '差點%',
        type: Number,
    })
    @IsNumber()
    hcpRate: number;

    @ApiProperty({
        description: '是否5.7.9制',
        type: Number,
    })
    @IsBoolean()
    is579: boolean;
}