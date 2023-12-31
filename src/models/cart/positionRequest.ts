import { mapLatLong } from "../../database/db.interface";
import _mapLatLong from "../common/_mapLatLong";
import { positonReq } from "../if";
import { ApiProperty } from "@nestjs/swagger";

export default class positionRequest implements positonReq {
	@ApiProperty({
		description: '分區代號',
		required: false,
	})
	zoneid?: string;

	@ApiProperty({
		description: '球道代號',
	})
	fairwayno: number;

	@ApiProperty({
		description: '經緯度物件',
		type: _mapLatLong,
	})
	location: mapLatLong;

	@ApiProperty({
		description: '離發球區距離',
		required: false,
	})
	distance?: number;

	@ApiProperty({
		description: '球車名稱(回傳用)',
		required: false,
	})
	cartName?: string;
}