import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { commonResWithData, positonReq } from "../../if";
import { mapLatLong } from "../../../database/db.interface";
const loc:mapLatLong = {
	latitude: 121.479379,
	longitude: 25.088817,
}
const carPositionExVal:positonReq = {
	cartid: '1KafHC5GHhIcYyqGuS3ocN',
	zoneid: '6R81eqZpYujVAeJotqeVEZ',
	fairwayno: 1,
	location: loc,
	distance: 150,
}

const res:commonResWithData<positonReq[]> = {
	errcode: '0',
	data: [carPositionExVal],
}
export const positionReqEx:Record<'Request', ExampleObject> = {
	Request: {
		value: carPositionExVal
	}
}

export const positionResEx:Record<'Response', ExampleObject> = {
	Response: {
		value: res,
	}
}

