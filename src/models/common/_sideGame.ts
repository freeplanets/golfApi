import { ApiProperty } from "@nestjs/swagger";
import { sideGames } from "../enum";
import { endScore, sideGame, sideGameHcp } from "../if";
import { IsBoolean, IsString } from "class-validator";
import _sideGameHcp from "./_sideGameHcp";
import _endScore from "./_endScore";

export default class _sideGame implements sideGame {
	@ApiProperty({
		description: '小遊戲名稱',
	})
	@IsString()
	name: sideGames;

	@ApiProperty({
		description: '是否採用差點',
		default: false,
	})
	@IsBoolean()
	NoHcp = false;

	@ApiProperty({
		description: '採用全差點',
		default: false,
	})
	@IsBoolean()
	FullHcp = false;
	@ApiProperty({
		description: '採用差點差額',
		default: false,
	})
	@IsBoolean()
	HcpDiff: boolean;

	@ApiProperty({
		description: '各來賓差點',
		isArray: true,
		type: _sideGameHcp,
	})
	Hcps: sideGameHcp[];

	@ApiProperty({
		description: '結果',
		type: _endScore,
	})
	scores: endScore;
}