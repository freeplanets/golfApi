import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { commonResWithData, forgetPassword, rstToken } from "../../if";

const forgetPasswordExVal:forgetPassword = {
	username: 'test1',
	mobile:'0999123456',
}
const forgetPasswordResExVal:commonResWithData<rstToken> = {
	errcode: '0',
	error: {
		message: 'test msg',
		extra: {}
	},
	data: {
		resetToken: 'ABDC',
	}
}
export const forgetPasswordEx:Record<'Request', ExampleObject> = {
	Request: {
		value: forgetPasswordExVal,
	}
}
export const forgetPasswordResEx:Record<'Response', ExampleObject> = {
	Response: {
		value: forgetPasswordResExVal,
	}
}