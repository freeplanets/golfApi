import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { devices, mapLatLong } from "../../../database/db.interface";
import { commonResWithData } from "../../../models/if";
import { commonResEx } from "../commonResponseEx";

const queryDeviceExVal:Partial<devices> = {
	siteid:'linkougolf',
	status:'idle',
}
const deviceExVal:Partial<devices> = {
	deviceName: 'D001',
	deviceType: 'ipad 10',
	status:'active',
	siteid:'linkougolf',
}

const loc:mapLatLong = {
	latitude: 121.479379,
	longitude: 25.088817,
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
export const locationEx:Record<'Request', ExampleObject> = {
	Request: {
		value: loc,
	}
}