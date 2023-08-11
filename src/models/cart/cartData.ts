import { ApiProperty } from "@nestjs/swagger";
import { carts, mapLatLong } from "../../database/db.interface";
import { IsNumber, IsObject, IsString } from "class-validator";
import _mapLatLong from "../common/_mapLatLong";
import { CartStatus } from "../../function/func.interface";

export default class cartData implements carts {
	@ApiProperty({
		description: '球車代號',
	})
	@IsString()
	cartid: string;

	@ApiProperty({
		description: '球車名稱',
	})
	@IsString()
	cartName: string;

	@ApiProperty({
		description: '球場代號',
		required: false,
	})
	@IsString()
	siteid: string;

	@ApiProperty({
		description: '球區代號',
		required: false,
	})
	@IsString()
	zoneid?: string;

	@ApiProperty({
		description: '球車代號',
		required: false,
	})
	@IsNumber()
	fairwayno?: number;

	@ApiProperty({
		description: '球車狀態',
		enum: CartStatus
	})
	@IsString()
	status: CartStatus;

	@ApiProperty({
		description: '球車位置',
		required: false,
		type: _mapLatLong,
	})
	@IsObject()
	location?: mapLatLong;

	@ApiProperty({
		description: '球車距離',
		required: false,
	})
	@IsNumber()
	distance?: number;

	@ApiProperty({
		description: '球車代號',
		required: false,
	})
	@IsNumber()
	loctm?: number;

	@ApiProperty({
		description: '設備代號',
	})
	@IsString()
	deviceid?: string;

	@ApiProperty({
		description: '設備名稱',
	})
	@IsString()
	deviceName?: string;

	@ApiProperty({
		description: '設備型號',
	})
	@IsString()
	deviceType?: string;
}