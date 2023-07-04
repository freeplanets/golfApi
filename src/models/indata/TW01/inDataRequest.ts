import { ApiProperty } from "@nestjs/swagger";
import { InDataTw01, caddie, player, zone } from "./ifInData";
import _caddie from "./_caddie";
import _zone from "./_zone";
import _player from "./_player";
import { IsNumber } from "class-validator";

export default class inDataRequest implements InDataTw01 {
	@ApiProperty({
		description: '第一位桿弟資料',
		type: _caddie,
	})
	caddie: caddie;

	@ApiProperty({
		description: '第一位桿弟資料',
		type: _caddie,
		required: false,
	})
	caddie2?: caddie;

	@ApiProperty({
		description: '球場分區代號',
		isArray: true,
		type: _zone,
	})
	zones: zone[];

	@ApiProperty({
		description: '來賓資料',
		isArray: true,
		type: _player,
	})
	players: player[];

	@ApiProperty({
		description: '開球時間',
	})
	@IsNumber()
	teeOffTimestamp: number;
}