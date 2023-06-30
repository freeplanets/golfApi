import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { verify2fa } from "../../if";

const verify2aExVal:verify2fa = {
	twoFAcode: 'ABCDxda',
}

export const verify2aEx:Record<'verify2a', ExampleObject> = {
	verify2a: {
		value: verify2aExVal,
	}
}
