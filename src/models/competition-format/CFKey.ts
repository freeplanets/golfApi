import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { cfKey } from "../../database/db.interface";

export default class CFKeyModel implements cfKey {
    @ApiProperty({
        description: '賽制代號',
        type: String,
        required: false,
    })
    @IsString()
    cfid?: string;
}