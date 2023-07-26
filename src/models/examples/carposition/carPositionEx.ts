import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { commonResWithData } from "../../if";
import { carPosition, mapLatLong } from "../../../database/db.interface";
const loc:mapLatLong = {
	latitude: 121.479379,
	longitude: 25.088817,
}
const carPositionExVal:carPosition = {
	cartid: 'cartid',
	siteid: 'linkougolf',
	zoneid: '01',
	fairwayno: 1,
	location: loc,
}
export const carPositionEx:Record<'Request', ExampleObject> = {
	Request: {
		value: carPositionExVal,
	}
}
const res:commonResWithData<carPosition[]> = {
	errcode: '0',
	data: [carPositionExVal],
}
export const carInFairwayEx:Record<'Response', ExampleObject> = {
	Response: {
		value: res,
	}
}