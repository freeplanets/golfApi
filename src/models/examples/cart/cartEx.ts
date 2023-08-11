import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { carts } from "../../../database/db.interface";
import { commonResWithData } from "../../../models/if";
import { commonResEx } from "../commonResponseEx";
import { CartStatus } from "../../../function/func.interface";

const cartExVal:Partial<carts> = {
	cartName: 'A01',
	siteid: 'linkougolf',
	status: CartStatus.idle,
}

const cartResExVal: commonResWithData<carts> = {
	...commonResEx.Response.value,
	data:cartExVal,
}

const cartQueryExVal:Partial<carts> = {
	siteid: 'linkougolf',
	status: CartStatus.onduty,
}

export const cartEx:Record<'Request', ExampleObject> = {
	Request: {
		value: cartExVal,
	}
}

export const cartResEx:Record<'Response', ExampleObject> = {
	Response: {
		value: cartResExVal,
	}
}

export const cartQueryEx:Record<'Request', ExampleObject> = {
	Request: {
		value: cartQueryExVal,
	}
}