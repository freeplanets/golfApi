import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { devices } from "src/database/db.interface";

export default class deviceData implements devices {
	@ApiProperty({
		description: '裝置編號',
	})
	@IsString()
	deviceid: string;

	@ApiProperty({
		description: '裝置名稱',
	})
	@IsString()
	deviceName: string;

	@ApiProperty({
		description: '裝置型號',
	})
	@IsString()
	deviceType: string;

	@ApiProperty({
		description: '狀態',
	})
	@IsString()
	status: string;

	@ApiProperty({
		description: '球場代號',
		required: false,
	})
	@IsString()
	siteid: string;

	@ApiProperty({
		description: '球車代號',
		required: false,
	})
	@IsString()
	cartid: string;	
}