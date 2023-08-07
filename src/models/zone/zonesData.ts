import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { fairwayObject, teeObject, zones } from "../../database/db.interface";
import _teeObject from "./fairway/_teeObject";
import _fairwayObject from "./fairway/_fairwayObject";

export default class zonesData implements zones {
	@ApiProperty({
		description: '球場分區代號',
	})
	@IsString()
	zoneid: string;

	@ApiProperty({
		description: '球場代號',
		required: false,
	})
	@IsString()
	siteid: string;

	@ApiProperty({
		description: '球場分區名稱',
		required: false,
	})	
	name: string;

	@ApiProperty({
		description: '洞數',
	})
	holes: number;

	@ApiProperty({
		description: '標準桿',
	})	
	par: number;

	@ApiProperty({
		description: '所有T台種類',
		isArray:true,
		type: _teeObject,
	})
	tees: teeObject[];

	@ApiProperty({
		description:'球道資料',
		isArray:true,
		type: _fairwayObject
	})
	fairways: fairwayObject[];

	@ApiProperty({
		description: '球場參照編號',
	})
	refNo: number;
}