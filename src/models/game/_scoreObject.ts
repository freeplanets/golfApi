import { ApiProperty } from "@nestjs/swagger";
import { AnyObject } from "../../models/if";
import { score } from "../../database/db.interface";

export default class _scoreObject implements score {
	@ApiProperty({
		description: '球洞序號 in 18',
	})
	holeNo: number;

	@ApiProperty({
		description: '分區代號',
	})
	zoneid: string;

	@ApiProperty({
		description: '球道序號',
	})
	fairwayno: number;

	@ApiProperty({
		description: '差點',
	})
	handicap: number;

	@ApiProperty({
		description: '標準桿',
	})
	par: number;

	@ApiProperty({
		description: '桿數/點數(sideGame)',
	})
	gross: number;

	@ApiProperty({
		description: '標準桿差',
	})
	parDiff: number;

	@ApiProperty({
		description:'其他訊息, sideGame 結果核對值, ...etc',
		required: false,
	})
	extraInfo?: AnyObject;
}