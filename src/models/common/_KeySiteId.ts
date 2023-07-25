import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export default class _KeySiteId {
	@ApiProperty({
		description: '球場/俱樂部代號',
	})
	@IsString()
	siteid: string;
}