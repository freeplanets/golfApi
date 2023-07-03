import { ApiProperty } from "@nestjs/swagger";
import { zoneInfo } from "../if";

export default class zoneInfoRequest implements zoneInfo {
	@ApiProperty({
		description: '球場ID',
	})
	ClubID: string;
	@ApiProperty({
		description: '區域ID',
	})
	ZoneID: string;
	@ApiProperty({
		description: '區域名稱',
	})
	ZoneName: string;
}