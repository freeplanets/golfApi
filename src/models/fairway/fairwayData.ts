import { ApiProperty } from "@nestjs/swagger";
import { fairwayInfo, greenObject, mapObject, tee } from "../../database/db.interface";
import { IsNumber, IsString } from "class-validator";
import _mapObject from "../common/_mapObject";
import _defaultKeyWithFairwayId from "../common/_defaultKeyWithFairwayId";
import _greenObject from "./_greenObject";
import _teeObject from "./_teeObject";

export default class fairwayData extends _defaultKeyWithFairwayId  implements fairwayInfo {
	@ApiProperty({
		description:'T台',
		isArray:true,
		type: _teeObject,
	})
	tees: tee[];

	@ApiProperty({
		description: '標準桿桿數',
	})
	@IsNumber()
	Par: number;

	@ApiProperty({
		description: '差點',
	})
	@IsNumber()
	handicap: number;

	@ApiProperty({
		description: '藍發球台枱距離果嶺距離',
		required: false,
	})
	@IsNumber()
	blueTee?: number;

	@ApiProperty({
		description: '白發球台枱距離果嶺距離',
		required: false,
	})
	@IsNumber()
	whiteTee?: number;

	@ApiProperty({
		description: '紅發球台枱距離果嶺距離',
		required: false,
	})
	@IsNumber()
	redTee?: number;

	@ApiProperty({
		description: '金發球台枱距離果嶺距離',
		required: false,
	})
	@IsNumber()
	yellowTee?: number;

	@ApiProperty({
		description: '黑發球台枱距離果嶺距離',
		required: false,
	})
	@IsNumber()
	blackTee?: number;

	@ApiProperty({
		description: '球道圖資訊',
		required: false,
		type: _mapObject,
	})
	fairwayMap?: mapObject;

	@ApiProperty({
		description:'果領資料',
		isArray:true,
		type: _greenObject,
	})
	greens?: greenObject[];
}