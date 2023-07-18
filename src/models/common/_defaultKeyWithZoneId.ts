import { defaultKey } from "src/database/db.interface";
import _defaultKeyWithClubId from "./_defaultKeyWithClubId"
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export default class _defaultKeyWithZoneId extends _defaultKeyWithClubId implements defaultKey {
	@ApiProperty({
		description: '區域代號',
	})
	@IsString()
	zoneid: string;
}