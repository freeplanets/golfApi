import { ApiProperty } from "@nestjs/swagger";
import { IsDateString } from "class-validator";
import { siteDateReq } from "../if";

export default class siteDateRequest implements siteDateReq {
	@ApiProperty({
		description: '球場代號',
	})
	siteid: string;

	@ApiProperty({
		description: '查詢日期',
	})
	@IsDateString()
	queryDate: string;
}