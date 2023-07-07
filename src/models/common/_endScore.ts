import { ApiProperty } from "@nestjs/swagger";
import { endScore, holeScore } from "../if";
import { IsNumber } from "class-validator";
import _holeScore from "./_holeScore";

export default class _endScore implements endScore {
	@ApiProperty({
		description: '總桿數/sidegame總分',
	})
	@IsNumber()
	gross: number;

	@ApiProperty({
		description: '各洞成積',
		isArray: true,
		type: _holeScore,
	})
	holes: holeScore[];
}