import { defaultKey } from "src/database/db.interface";
import _defaultKeyWithZoneId from "./_defaultKeyWithZoneId";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export default class _defaultKeyWithFairwayId extends _defaultKeyWithZoneId implements defaultKey {
	@ApiProperty({
		description: '球道號碼',
	})
	@IsNumber()
	fairwayid: number;
}