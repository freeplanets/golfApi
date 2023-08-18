import { ApiProperty } from "@nestjs/swagger";
import { games, player } from "../../database/db.interface";
import _partialPlayerObject from "./_partialPlayerObject";

export default class scoresRequest implements Partial<games> {
	@ApiProperty({
		description: '來賓擊球單一洞或多洞結果',
		isArray: true,
		type: _partialPlayerObject,
	})
	players?: player[];
}