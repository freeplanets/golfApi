import { ApiProperty } from "@nestjs/swagger";
import { client } from "../../database/db.interface";
import { IsNumber, IsString } from "class-validator";

export default class _client implements client {
	@ApiProperty({
		description: '來賓編號',
	})
	@IsString()
	ID: string;

	@ApiProperty({
		description: '來賓報到編號',
	})
	@IsString()
	checkInID: string;

	@ApiProperty({
		description: '來賓姓名',
	})
	@IsString()
	name: string;

	@ApiProperty({
		description: '擊球順序',
		required: false,
	})
	@IsNumber()
	swingOrder?: number;
}