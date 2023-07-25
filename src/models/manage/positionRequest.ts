import { ApiProperty } from "@nestjs/swagger";
import { carPosition, mapLatLong } from "../../database/db.interface";
import { IsNumber, IsString } from "class-validator";
import _mapLatLong from "../common/_mapLatLong";

export default class positionRequest implements carPosition {
	@ApiProperty({
		description: 'hashkey',
	})
	id: string;

	@ApiProperty({
		description: '球場代號'
	})
	@IsString()
	siteid: string;
	@ApiProperty({
		description: '區域代號'
	})
	@IsString()	
	zoneid: string;
	@ApiProperty({
		description: '球道代號'
	})
	@IsNumber()
	fairwayid: number;

	@ApiProperty({
		description: '球車編號',
	})
	carid: number;

	@ApiProperty({
		description: '經緯度物件',
		type: _mapLatLong,
	})
	location: mapLatLong;
}