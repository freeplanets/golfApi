import { ApiProperty } from "@nestjs/swagger";
import { zone } from "./ifInData";
import { IsNumber } from "class-validator";

export default class _zone implements zone {
	@ApiProperty({
		description: '球場區域代碼',
	})
	@IsNumber()
	number: number;
}