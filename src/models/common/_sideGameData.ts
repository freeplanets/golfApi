import { ApiProperty } from "@nestjs/swagger";
import { sideGame, sideGamesData } from "../../database/db.interface";
import { IsString } from "class-validator";
import _sideGame from "./_sideGame";

export default class _sideGameData implements sideGamesData {
	@ApiProperty({
		description: '組別編號',
	})
	@IsString()
	GroupID: string;

	@ApiProperty({
		description: '小遊戲列表',
		isArray:true,
		type: _sideGame,
	})
	sideGames: sideGame[];
}