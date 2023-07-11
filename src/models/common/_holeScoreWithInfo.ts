import { ApiProperty } from "@nestjs/swagger";
import { holeScoreWithInfo } from "../if";
import { IsNumber } from "class-validator";
import _playScore from "./_playScore";
import _holeScore from "./_holeScore";

export default class _holeScoreWithInfo extends _holeScore implements holeScoreWithInfo {
	@ApiProperty({
		description: '標準桿數',
	})
	@IsNumber()
	Par: number;

	@ApiProperty({
		description: '差點',
	})
	@IsNumber()
	Handicap: number;
}