import { carPosition, mapLatLong } from "src/database/db.interface";
import _defaultKey from "../common/_defaultKey";
import _defaultKeyWithFairwayId from "../common/_defaultKeyWithFairwayId";
import { ApiProperty } from "@nestjs/swagger";
import _mapLatLong from "../common/_mapLatLong";
import { IsNumber } from "class-validator";

export default class carPositionData extends _defaultKeyWithFairwayId implements carPosition {
	@ApiProperty({
		description: '球車編號',
	})
	@IsNumber()
	carid: number;
	
	@ApiProperty({
		description: '球車位置',
		type: _mapLatLong
	})
	location: mapLatLong;
}