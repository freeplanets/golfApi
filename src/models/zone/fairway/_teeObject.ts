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
		description: '斜度指數',
		required: false,
	})
	slope?: number;

	@ApiProperty({
		description: '難度指數',
		required: false,
	})
	rating?: number;

	@ApiProperty({
		description: '離果領距離',
		required: false,
	})
	distance?: number;
}