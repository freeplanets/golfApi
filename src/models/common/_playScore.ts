import { ApiProperty } from "@nestjs/swagger";
import { playScore } from "../../database/db.interface";
import { IsNumber, IsString } from "class-validator";

export default class _playScore implements playScore {
	@ApiProperty({
		description: '來賓代號',
	})
	@IsString()
	playerid: string;
	
	@ApiProperty({
		description: '桿數/sidegame分數'
	})
	@IsNumber()
	gross: number;

	@ApiProperty({
		description: '',
	})
	SwingOrder: number;
}