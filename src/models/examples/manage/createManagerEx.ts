import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { createManager } from "../../if";
import { updateManagerExVal } from "./updateManagerEx";
import { UserType } from "../../enum";

const createManagerExVal:createManager = {
	ClubID: 'TW01',
	password: 'testest',
	userType: UserType.Manage,
	...updateManagerExVal
}

export const createManagerEx:Record<'Request', ExampleObject> = {
	Request: {
		value: createManagerExVal,
	}
}