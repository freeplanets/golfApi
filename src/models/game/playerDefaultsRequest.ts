import { ApiProperty } from "@nestjs/swagger";
import { playerDefault } from "../../database/db.interface";
import _playerDefault from "./_playerDefault";

export default class  {
	@ApiProperty({
		description: '球員 hcp 預設資料',
		isArray: true,
		type: _playerDefault,
	})
	playerDefaults: playerDefault[];
}