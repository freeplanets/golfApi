import { ApiProperty } from "@nestjs/swagger";
import { locReq } from "../if";
import _mapLatLong from "./_mapLatLong";

export default class locRequest extends _mapLatLong implements locReq {
	@ApiProperty({
		description: '分區代號'
	})
	zoneid?: string;

	@ApiProperty({
		description: '球道代號',
	})
	fairwayno?: number;

	@ApiProperty({
		description: '距離',
	})
	distance?: number;
}