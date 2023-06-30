import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { resetPassword } from "../../if";

const resetPasswordExVal:resetPassword = {
	resetToken: 'ABCDEF',
	smsCode: '123456',
	newPassword: 'testetst',
}

export const resetPasswordEx:Record<'Request', ExampleObject> = {
	Request: {
		value: resetPasswordExVal,
	}
}