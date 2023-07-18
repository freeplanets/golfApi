import { defaultKey } from "src/database/db.interface";
import _defaultKey from "./_defaultKey";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export default class _defaultKeyWithClubId extends _defaultKey implements defaultKey {
	@ApiProperty({
		description: '球場/俱樂部代號',
	})
	@IsString()
	clubid: string;
}