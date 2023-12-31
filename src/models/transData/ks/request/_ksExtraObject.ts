import { ApiProperty } from "@nestjs/swagger";
import { ksExtra } from "../ks.interface";
import { IsString } from "class-validator";

export default class _ksExtraObject implements ksExtra {
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