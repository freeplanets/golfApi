import { ApiProperty } from "@nestjs/swagger";
import { playerGameData, sideGame } from "../../database/db.interface";
import { HcpType, sideGameFormat, sideGames } from "../../models/enum";
import _playerGameData from "./_playerGameData";

export default class _sideGameObject implements sideGame {
	@ApiProperty({
		description: '小遊戲hashkey',
	})
	sidegameid: string;

	@ApiProperty({
		description: '小遊戲名稱',
		enumName: '小遊戲各項目名稱',
		enum: sideGames,
	})
	sideGameName: sideGames;

	@ApiProperty({
		description: '分數比對方式',
		default: null,
		enum: sideGameFormat,
	})
	format: sideGameFormat;

	@ApiProperty({
		description: '每點分數/default 1',
	})
	wager: number;

	@ApiProperty({
		description: '計分上限/default 0 無上限',
		required: false,
	})
	wagerMax?: number;

	@ApiProperty({
		description: '平手轉下洞/ default false',
		required: false,
	})
	carryOver?: boolean;

	@ApiProperty({
		description: '差點計算方式',
		enum: HcpType,
	})
	hcpType: HcpType;

	@ApiProperty({
		description: '小遊戲各球員資料',
		isArray: true,
		type: _playerGameData,
	})
	playerGameData: playerGameData[];
}