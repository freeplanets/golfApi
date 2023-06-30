import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { commonRes } from "../if";

const commonResExVal:commonRes = {
	errcode: '0',
	error: {
		message: 'show if error raise',
		extra: {}
	}
}

export const commonResEx:Record<'Response', ExampleObject> = {
	Response: {
		value: commonResExVal,
	}
}