import { ApiProperty } from "@nestjs/swagger";
import { holeScore, swingResult } from "../../database/db.interface";
import _holeScore from "./_holeScore";

export default class _swingResult implements swingResult {
	@ApiProperty({
		description: '組別編號',
	})
	GroupID: string;
	@ApiProperty({
		description: '各洞的擊球結果',
		isArray:true,
		type: _holeScore,
	})
	scores: holeScore[];
}