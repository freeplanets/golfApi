import { ApiProperty } from "@nestjs/swagger";
import { HcpType, sideGames } from "../enum";
import { playerGameData, sideGame } from "../../database/db.interface";
import { IsString } from "class-validator";
// import _sideGameHcp from "./_sideGameHcp";
// import _endScore from "./_endScore";

export default class _sideGame implements sideGame {
	@ApiProperty({
		description: '小遊戲名稱',
	})
	@IsString()
	sideGameName: sideGames;

	@ApiProperty({
		description: '差點採用方法',
		enum: HcpType,
		enumName: '差點選項',
	})
	hcpType: HcpType;
	format: string;
	wager: number;
	wagerMax?: number;
	playerGameData: playerGameData[];
	/*
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
	*/
}