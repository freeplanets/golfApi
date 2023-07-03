import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { updateManager } from "../../if";
import { UserType } from "../../enum";

export const updateManagerExVal:updateManager = {
	account: 'test',
	nickname: 'test',
	password: 'a1b1134232',
	userType: UserType.Manage,
	workSection: {
		start: '08:00',
		end: '16:00',
	},
	title: 'manage',
	mobile: '012345678',
	enable2FA: false,
}
export const updateManagerEx:Record<'Request', ExampleObject> = {
	Request: {
		value: updateManagerExVal,
	}
}