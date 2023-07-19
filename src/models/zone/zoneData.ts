import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Zone } from "src/database/db.interface";

export default class zoneData implements Zone {
	@ApiProperty({
		description: '資料 hashKey, 空白為新增資料, do not change it',
		required: false,
	})
	@IsString()
	id: string;

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
	clubid: string;

	@ApiProperty({
		description: '球場分區名稱',
		required: false,
	})	
	name: string;

	@ApiProperty({
		description: '所有T台種類',
		isArray:true,
		type: String,
	})
	tees: string[];

	@ApiProperty({
		description:'球場分區標準標',
		required: false,
	})
	Par?: number;
}