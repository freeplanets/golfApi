import { ApiProperty } from "@nestjs/swagger";
import { ksZoneReq } from "../ks.interface";
import { IsNumber } from "class-validator";

export default class _ksZoneReq implements ksZoneReq {
	@ApiProperty({
		description: '球場區域代碼',
	})
	@IsNumber()
	number: number;
}