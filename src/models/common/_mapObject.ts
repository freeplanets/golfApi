import { ApiProperty } from "@nestjs/swagger";
import { mapAssetObject, mapLatLong, mapObject } from "../../database/db.interface";
import { IsString } from "class-validator";
import _mapLatLong from "./_mapLatLong";
import _mapAssetObject from "./_mapAssetObject";

export default class _mapObject implements mapObject {
	@ApiProperty({
		description: '檔案位置',
	})
	@IsString()
	src: string;

	@ApiProperty({
		description: '備註',
		required: false,
	})
	@IsString()
	memo: string;
	@ApiProperty({
		description: '左上',
		type: _mapLatLong,
	})
	topLeft: mapLatLong;

	@ApiProperty({
		description: '右上',
		type: _mapLatLong,
	})
	topRight: mapLatLong;

	@ApiProperty({
		description: '左下',
		type: _mapLatLong,
	})
	bottomLeft: mapLatLong;

	@ApiProperty({
		description: '右下',
		type: _mapLatLong,
	})
	bottomRight: mapLatLong;

	@ApiProperty({
		description: '球道上物件',
		isArray: true,
		type: _mapAssetObject,
	})
	assets: mapAssetObject[];
}