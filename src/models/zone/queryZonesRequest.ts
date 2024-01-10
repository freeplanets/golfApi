import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { zones } from "../../database/db.interface";
import _teeObject from "./fairway/_teeObject";

export default class queryZonesRequest implements Partial<zones> {
	@ApiProperty({
		description: '球場分區代號',
		required: false,
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
}