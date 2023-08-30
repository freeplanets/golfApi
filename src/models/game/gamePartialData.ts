import { ApiProperty } from "@nestjs/swagger";
import { caddie, games, player, playerDefault, sideGame } from "../../database/db.interface";
import _playerObject from "./_playerObject";
import _playerDefault from "./_playerDefault";
import _sideGameObject from "./_sideGameObject";
import _caddieObject from "./_caddieObject";

export default class gamePartialData implements Partial<games> {
	@ApiProperty({
		description: '球場代號',
	})
	siteid: string;

	@ApiProperty({
		description: '球道組合代號',
	})
	courseid: string;

	@ApiProperty({
		description: '開始球區',
	})
	outZone: string;

	@ApiProperty({
		description: '結束球區',
	})
	inZone: string;

	@ApiProperty({
		description: '開球球區',
	})
	stepInZone: string;

	@ApiProperty({
		description: '開球球道',
	})
	stepInFairway: number;

	@ApiProperty({
		description: '標準桿桿數',
	})
	par: number;

	@ApiProperty({
		description: '難度指數',
	})
	rating: number;

	@ApiProperty({
		description: '斜度指數',
	})
	slope: number;

	@ApiProperty({
		description: '預計開球時間',
	})
	esttimatedStartTime: number;

	@ApiProperty({
		description: '開始時間',
	})
	startTime: number;

	@ApiProperty({
		description: '結束時間',
	})
	endTime: number;

	@ApiProperty({
		description: '來賓資料/記錄',
		isArray: true,
		type: _playerObject,
	})
	players: player[];

	@ApiProperty({
		description: '桿弟名稱',
		isArray: true,
		type: _caddieObject,
	})
	caddies: caddie[];

	@ApiProperty({
		description: '球車',
		isArray: true,
		type: String,
	})
	carts: string[];

	@ApiProperty({
		description: '差點',
		isArray:true,
		type: _playerDefault,
	})
	playerDefaults: playerDefault[];

	@ApiProperty({
		description: '小遊戲項目',
		isArray: true,
		type: _sideGameObject,
	})
	sideGames: sideGame[];

	@ApiProperty({
		description:'賽事/球隊名稱',
		required: false,
	})
	gameTitle?: string;
}