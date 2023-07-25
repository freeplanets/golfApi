import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { devices } from "src/database/db.interface";

export default class queryDevicesRequest implements Partial<devices> {
	@ApiProperty({
		description: '球場代號',
	})
	@IsString()
	siteid: string;

	@ApiProperty({
		description: '狀態',
		required: false,
	})
	@IsString()	
	status?: string;

	@ApiProperty({
		description: '球車代號',
		required: false,
	})
	@IsString()
	cartid?: string;
}