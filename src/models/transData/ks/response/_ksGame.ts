import { ApiProperty } from "@nestjs/swagger";
import { ksGame, ksHole, ksScore, ksZone } from "../ks.interface";
import _ksZone from "./_ksZone";
import _ksHole from "./_ksHole";
import _ksScore from "./_ksScore";

export default class _ksGame implements ksGame {
	@ApiProperty({
		description: '球區資料',
		isArray: true,
		type: _ksZone,
	})
	zones: ksZone[];

	@ApiProperty({
		description: '球洞資料',
		isArray: true,
		type: _ksHole,
	})
	holes: ksHole[];

	@ApiProperty({
		description: '開始擊球時間',
	})
	startDateTime: number;

	@ApiProperty({
		description: '成績',
		isArray: true,
		type: _ksScore,
	})
	scores: ksScore[];
}