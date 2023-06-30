import { ApiProperty } from "@nestjs/swagger";
import { resetPassword } from "../if";

export default class resetPasswordRequest implements resetPassword {
	@ApiProperty({
		description: '重置權杖 / reset password token',
	})
	resetToken: string;
	@ApiProperty({
		description: '簡訊驗證碼 / verify code sent via sms',
	})
	smsCode: string;
	@ApiProperty({
		description: '新密碼',
	})
	newPassword: string;
}