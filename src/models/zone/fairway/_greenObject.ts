import { ApiProperty } from "@nestjs/swagger";
import { greenObject, mapAssetObject } from "../../../database/db.interface";
import _mapAssetObject from "../../common/_mapAssetObject";

export default class _greenObject implements greenObject {
	@ApiProperty({
		description:'果嶺代號',
	})
	sno: string;

	@ApiProperty({
		description:'距上邊界距離',
	})
	topEdge: number;

	@ApiProperty({
		description:'距左邊界距離',
	})
	leftEdge: number;

	@ApiProperty({
		description:'距右邊界距離',
	})
	rightEdge: number;

	@ApiProperty({
		description:'距下邊界距離',
	})
	bottomEdge: number;

	@ApiProperty({
		description:'球道上物件',
		isArray: true,
		type: _mapAssetObject,
	})
	assets: mapAssetObject[];

	@ApiProperty({
		description:'圖片寬度',
	})
	width: number;

	@ApiProperty({
		description:'圖片高度',
	})
	height: number;

	@ApiProperty({
		description:'寬度的距離長度(米)',
	})
	widthDistance: number;
}