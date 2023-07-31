import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { carts } from "../../../database/db.interface";
import { commonResWithData } from "src/models/if";
import { commonResEx } from "../commonResponseEx";

const cartExVal:Partial<carts> = {
	cartName: 'A01',
	siteid: 'linkougolf',
	status: 'active',
}

const cartResExVal: commonResWithData<carts> = {
	...commonResEx.Response.value,
	data:cartExVal,
}

const cartQueryExVal:Partial<carts> = {
	siteid: 'linkougolf',
	status: 'active',
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