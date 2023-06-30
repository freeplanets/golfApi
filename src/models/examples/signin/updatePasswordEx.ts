import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { updatePassword } from "../../if";

const updatePasswordExVal:updatePassword = {
	oldPassword: 'testtest',
	newPassword: 'test1234',
	newPassword2: 'test1234',
}

export const updatePasswordEx:Record<'Request', ExampleObject> = {
	Request: {
		value: updatePasswordExVal,
	}
}