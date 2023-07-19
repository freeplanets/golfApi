import { carPositionHistory, mapLatLong } from "src/database/db.interface";
import _defaultKey from "../common/_defaultKey";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import _mapLatLong from "../common/_mapLatLong";
import _defaultKeyWithClubId from "../common/_defaultKeyWithClubId";

export default class carPositionHistoryData extends _defaultKeyWithClubId implements carPositionHistory {
	@ApiProperty({
		description: '球車編號',
	})
	@IsNumber()
	carid: number;

	@ApiProperty({
		description: '位置經緯度',
		type: _mapLatLong,
	})
	location: mapLatLong;

	@ApiProperty({
		description: '時間戳/timestamps'
	})
	ts?: string;
}