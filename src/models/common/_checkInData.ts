import { ApiProperty } from "@nestjs/swagger";
import { checkInData, client, endScore, gameZones, stepIn } from "../if";
import { IsNumber, IsString } from "class-validator";
import _client from "./_client";
import _gameZone from "./_gameZone";
import _stepIn from "./_stepIn";
import _endScore from "./_endScore";
import _sideGame from "./_sideGame";
import _signinResData from "./_sideGameData";

export default class _checkInData extends _signinResData implements checkInData {
	@ApiProperty({
		description: '球場代號',
	})
	@IsString()
	ClubID: string;

	@ApiProperty({
		description: '分區組合',
		type: _gameZone,
	})
	zones: gameZones;

	@ApiProperty({
		description: '來賓資料',
		isArray: true,
		type: _client,
	})
	players: client[];

	@ApiProperty({
		description: '起始球道',
		type: _stepIn,
	})
	start: stepIn;

	@ApiProperty({
		description: '來賓擊球結果',
		type: _endScore,
	})
	scores: endScore;

	@ApiProperty({
		description:'開始時間戳',
	})
	@IsNumber()
	inTimestamp?: number;
}