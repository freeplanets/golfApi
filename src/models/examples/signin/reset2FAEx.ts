import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { reset2FA } from "../../if";

const reset2FAExVal:reset2FA = {
	password: 'test1234',
}

export const reset2FAEx:Record<'Request', ExampleObject> = {
	Request: {
		value: reset2FAExVal,
	}
}