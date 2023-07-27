import { ApiProperty } from "@nestjs/swagger";
import { player, score } from "../../database/db.interface";
import { AnyObject } from "../../models/if";
import _scoreObject from "./_scoreObject";

export default class _playerObject implements player {
	@ApiProperty({
		description: '來賓名稱',
	})
	playerName: string;

	@ApiProperty({
		description: '差點/default 0',
	})
	hcp: string;

	@ApiProperty({
		description: 'T台名稱',
	})
	tee: string;

	@ApiProperty({
		description: '擊球順序',
	})
	playerOrder: number;

	@ApiProperty({
		description: '總桿數',
	})
	gross: number;

	@ApiProperty({
		description: '擊球結果',
		isArray: true,
		type: _scoreObject,
	})
	holes: score[];

	@ApiProperty({
		description: '球場提供的訊息',
		required: false,
		type: Object,
	})
	extra: AnyObject;
}