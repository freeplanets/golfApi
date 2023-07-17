import { ApiProperty } from "@nestjs/swagger";
import { carPosition, mapLatLong } from "../../database/db.interface";
import { IsNumber, IsString } from "class-validator";
import _mapLatLong from "../common/_mapLatLong";

export default class positionRequest implements carPosition {
	@ApiProperty({
		description: '來賓報到編組號碼',
	})
	groupid: string;

	@ApiProperty({
		description: '球場代號'
	})
	@IsString()
	clubid: string;
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
		description: '球車代號',
	})
	@IsNumber()
	carID: number;	
	@ApiProperty({
		description: '經緯度物件',
		type: _mapLatLong,
	})
	position: mapLatLong;
}