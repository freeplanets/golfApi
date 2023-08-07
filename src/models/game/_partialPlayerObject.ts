import { ApiProperty } from "@nestjs/swagger";
import { player, score } from "../../database/db.interface";
import _scoreObject from "./_scoreObject";

export default class _partialPlayerObject implements Partial<player> {
	@ApiProperty({
		description: '來賓名稱',
	})
	playerName: string;

	@ApiProperty({
		description: '擊球結果',
		isArray: true,
		type: _scoreObject,
	})
	holes: score[];
}