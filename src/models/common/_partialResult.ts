import { ApiProperty } from "@nestjs/swagger";
import { endScore, partialResult } from "../../database/db.interface";
import { IsString } from "class-validator";
import _endScore from "./_endScore";

export default class _partialResult implements partialResult {
	@ApiProperty({
		description: '組別編號',
	})
	@IsString()
	GroupID: string;

	@ApiProperty({
		description: '擊球成績',
		type: _endScore,
	})
	scores: endScore;

	@ApiProperty({
		description: '小遊戲成績',
		type: _endScore,
	})
	sideGameScores: endScore;
}