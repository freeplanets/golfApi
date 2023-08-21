import { ApiProperty } from "@nestjs/swagger";
import { score } from "../../database/db.interface";
import _scoreObject from "./_scoreObject";

export default class scoresRequest {
	@ApiProperty({
		description: '來賓擊球單一洞或多洞結果',
		isArray: true,
		type: _scoreObject,
	})
	holes: score[];
}