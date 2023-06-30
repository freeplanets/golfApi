import { ApiProperty } from "@nestjs/swagger";
import { updateManager } from "../if";

export default class updateManagerRequest implements updateManager {
	@ApiProperty({
		description: '暱稱',
		required: false,
	})
	nickname?: string;
	@ApiProperty({
		description: '密碼',
		required: false,
	})
	password?: string;
	@ApiProperty({
		description: '職稱',
		required: false,
	})
	title?: string;
	@ApiProperty({
		description:'手機號碼',
		required: false,
	})
	mobile?: string;
	@ApiProperty({
		description: '2FA 啟用',
		required: false,
	})
	enable2FA?: boolean;
}