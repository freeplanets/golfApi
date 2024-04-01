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
        description: '賽制代號',
    })
    @IsString()
    cfType: string;
}