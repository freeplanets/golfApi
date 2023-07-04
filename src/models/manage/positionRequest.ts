import { ApiProperty } from "@nestjs/swagger";
import { carPosition, mapLatLong } from "../if";
import { IsNumber, IsString } from "class-validator";
import _mapLatLong from "../common/_mapLatLong";

export default class positionRequest implements carPosition {
	@ApiProperty({
		description: '球場代號'
	})
	@IsString()
	ClubID: string;
	@ApiProperty({
		description: '區域代號'
	})
	@IsString()	
	ZoneID: string;
	@ApiProperty({
		description: '球道代號'
	})
	@IsNumber()
	FairwayID: number;
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