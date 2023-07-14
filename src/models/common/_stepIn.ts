import { ApiProperty } from "@nestjs/swagger";
import { stepIn } from "../../database/db.interface";
import { IsNumber, IsString } from "class-validator";

export default class _stepIn implements stepIn {
	@ApiProperty({
		description: '分區代號',
	})
	@IsString()
	ZoneID: string;

	@ApiProperty({
		description: '球道編號',
	})
	@IsNumber()
	FairwayID: number;
}