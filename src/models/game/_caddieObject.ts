import { ApiProperty } from "@nestjs/swagger";
import { caddie } from "../../database/db.interface";

export default class _caddieObject implements caddie {
	@ApiProperty({
		description: '桿弟編號',
	})
	caddieid: string;

	@ApiProperty({
		description: '桿弟名稱',
	})
	caddieName: string;
}