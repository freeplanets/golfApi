import { ApiProperty } from "@nestjs/swagger";
import { playScore } from "../if";
import { IsNumber, IsString } from "class-validator";

export default class _playScore implements playScore {
	@ApiProperty({
		description: '來賓代號',
	})
	@IsString()
	playerID: string;
	
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