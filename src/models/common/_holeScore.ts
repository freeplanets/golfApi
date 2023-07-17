import { ApiProperty } from "@nestjs/swagger";
import { holeScore, playScore } from "../../database/db.interface";
import { IsArray, IsNumber, IsString } from "class-validator";
import _playScore from "./_playScore";

export default class _holeScore implements holeScore {
	@ApiProperty({
		description: '區域代號',
	})
	@IsString()
	zoneid: string;

	@ApiProperty({
		description: '球道號碼',
	})
	@IsNumber()
	fairwayid: number;

	@ApiProperty({
		description: '來賓擊球結果',
		isArray:true,
		type: _playScore,
	})
	@IsArray()
	scores: playScore[];

	@ApiProperty({
		description: '來賓實際進行球洞順序',
	})
	@IsNumber()
	PlayOrder: number;	
}