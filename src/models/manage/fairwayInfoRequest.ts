import { ApiProperty } from "@nestjs/swagger";
import { fairwayInfo, mapObject } from "../if";
import { IsNumber, IsString } from "class-validator";
import _mapObject from "../common/_mapObject";

export default class fairwayInfoRequest implements fairwayInfo {
	@ApiProperty({
		description: '球場/俱樂部代號',
	})
	@IsString()
	ClubID: string;

	@ApiProperty({
		description: '區域代號',
	})
	@IsString()
	ZoneID: string;

	@ApiProperty({
		description: '球道號碼',
	})
	@IsNumber()
	FairwayID: number;

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
}