import { ApiProperty } from "@nestjs/swagger";
import { timeSection, updateManager } from "../if";
import { UserType } from "../enum";
import _timeSection from "../common/_timeSection";

export default class updateProfileRequest implements updateManager {
	@ApiProperty({
		description: '帳號',
		required: true,
	})
	account: string;
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
	@ApiProperty({
		description:'管理人員類別',
		enum: UserType,
		required: false,
	})
	userType?: UserType;
	@ApiProperty({
		description:'工作時段',
		type: _timeSection,
		required: false,
	})
	workSection?: timeSection;
	@ApiProperty({
		description: '手機號碼',
		required: false,
	})	
	mobile?: string;
	@ApiProperty({
		description: '2FA 啟用',
		required: false,
	})
	enable2FA?: boolean;
}