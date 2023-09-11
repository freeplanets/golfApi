import { ApiProperty } from "@nestjs/swagger";
import { playerGameData, score } from "../../database/db.interface";
import _scoreObject from "./_scoreObject";
import { sideGameGroup } from "../../models/enum";

export default class _playerGameData implements playerGameData {
	@ApiProperty({
		description: '是否參與',
	})
	selected: boolean;

	@ApiProperty({
		description: '球員名稱',
	})
	playerName: string;

	@ApiProperty({
		description: 'hcp 差點',
	})
	hcp: string;

	@ApiProperty({
		description: '分組',
		enumName: '小遊戲分組名稱',
		enum: sideGameGroup,
	})
	betterballGroup: sideGameGroup;

	@ApiProperty({
		description: '總分',
	})
	points: number;

	@ApiProperty({
		description: '擊球序',
	})
	playOrder: number;

	@ApiProperty({
		description: '各洞分數',
		isArray: true,
		type: _scoreObject,
	})
	holes: score[];
}