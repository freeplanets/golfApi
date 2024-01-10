import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";
import { competitionFormat } from "../../database/db.interface";

export default class CFQuery implements Partial<competitionFormat> {
    @ApiProperty({
        description: '賽制名稱',
    })
    @IsString()
    cfName?: string;

    @ApiProperty({
        description: '是否5.7.9制',
    })
    @IsBoolean()
    is579?: boolean;
}