import { ApiProperty } from "@nestjs/swagger";
import { InDataExtra } from "./checkin.interface";
import { IsString } from "class-validator";

export default class _extra implements InDataExtra {
	@ApiProperty({
		description: '來賓代號',
	})
	@IsString()
	memberId: string;

	@ApiProperty({
		description: '來賓報到編號',
	})
	@IsString()
	checkInId: string;
}