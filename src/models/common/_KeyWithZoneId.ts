import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import _KeySiteId from "./_KeySiteId";

export default class _KeyWithZoneId extends _KeySiteId {
	@ApiProperty({
		description: '區域代號',
	})
	@IsString()
	zoneid: string;
}