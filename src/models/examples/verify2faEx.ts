import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { verify2fa } from "../if";
import verify2faResponse from "../signin/verify2faResponse";

const verify2aExVal:verify2fa = {
	twoFAcode: 'ABCDxda',
}
const verify2aResExVal: verify2faResponse = {
	errcode: '0',
	error: {
		message: 'some message',
		extra: {}
	}
}

export const verify2aEx:Record<'verify2a', ExampleObject> = {
	verify2a: {
		value: verify2aExVal,
	}
}
export const verify2aResEx:Record<'Response', ExampleObject> = {
	Response: {
		value: verify2aResExVal,
	}
}