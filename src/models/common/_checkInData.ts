import { ApiProperty } from "@nestjs/swagger";
import { checkInData, client, gameZones, stepIn } from "../if";
import { IsNumber, IsString } from "class-validator";
import _client from "./_client";
import _gameZone from "./_gameZone";
import _stepIn from "./_stepIn";

export default class _checkInData implements checkInData {
	@ApiProperty({
		description: '球場代號',
	})
	@IsString()
	ClubID: string;

	@ApiProperty({
		description: '組別編號',
	})
	@IsString()
	GroupID: string;

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
		description:'開始時間戳',
	})
	@IsNumber()
	inTimestamp?: number;
}