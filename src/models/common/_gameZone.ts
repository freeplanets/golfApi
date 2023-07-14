import { ApiProperty } from "@nestjs/swagger";
import { gameZones } from "../../database/db.interface";
import { IsString } from "class-validator";

export default class _gameZone implements gameZones {
	@ApiProperty({
		description: '起始區代號',
	})
	@IsString()
	out: string;

	@ApiProperty({
		description: '結束區代號',
	})
	@IsString()
	in: string;
}