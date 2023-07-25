import { ApiProperty } from "@nestjs/swagger";
import { teeObject } from "src/database/db.interface";

export default class _teeObject implements teeObject {
	@ApiProperty({
		description: 'T台名稱',
	})
	teeName: string;

	@ApiProperty({
		description: 'T台顏色',
	})
	teeColor: string;

	@ApiProperty({
		description: '離果領距離',
	})
	distance?: number;
}