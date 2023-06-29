import { IsMobilePhone } from "class-validator";
import { forgetPassword } from "../if";
import { ApiProperty } from "@nestjs/swagger";

export default class forgetPasswordRequest implements forgetPassword {
	@ApiProperty({
		description: '帳號 / Username',
	})
	username: string;
	@ApiProperty({
		description: '手機號 / Mobile number',
	})
	@IsMobilePhone('zh-TW')
	mobile: string;
}