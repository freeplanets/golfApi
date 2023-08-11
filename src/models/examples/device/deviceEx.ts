import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { devices } from "src/database/db.interface";
import { commonResWithData } from "../../../models/if";
import { commonResEx } from "../commonResponseEx";

const queryDeviceExVal:Partial<devices> = {
	siteid:'linkougolf',
	status:'active',
}
const deviceExVal:Partial<devices> = {
	deviceName: 'D001',
	deviceType: 'ipad 10',
	status:'active',
	siteid:'linkougolf',
}


const deviceResExVal:commonResWithData<Partial<devices>> = {
	...commonResEx.Response.value,
	data: deviceExVal,
}

export const deviceEx:Record<'Request', ExampleObject> = {
	Request: {
		value: deviceExVal,
	}
}

export const deviceResEx:Record<'Response', ExampleObject> = {
	Response: {
		value: deviceResExVal,
	}
}

export const queryDeviceRequestEx:Record<'Request', ExampleObject> = {
	Request: {
		value: queryDeviceExVal,
	}
}