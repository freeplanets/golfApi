import { ApiProperty } from "@nestjs/swagger";
import { sideGameHcp } from "../../database/db.interface";
import { IsNumber, IsString } from "class-validator";

export default class _sideGameHcp implements sideGameHcp {
	@ApiProperty({
		description: '來賓編號',
	})
	@IsString()
	PlayerID: string;

	@ApiProperty({
		description: '差點',
	})
	@IsNumber()
	handicap: number;
}