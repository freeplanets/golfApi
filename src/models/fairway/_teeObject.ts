import { ApiProperty } from "@nestjs/swagger";
import { Tee } from "src/database/db.interface";

export default class _teeObject implements Tee {
	@ApiProperty({
		description: 'T台名稱',
	})
	name: string;

	@ApiProperty({
		description: '離果領距離',
	})
	distance?: number;
}