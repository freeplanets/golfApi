import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { zones } from "../../../database/db.interface";

const zonesRequestExVal:Partial<zones> = {
	siteid: 'linkougolf',
	zoneid: '',
	name:'West',
}
export const queryZonesRequestEx:Record<'Request', ExampleObject> = {
	Request: {
		value: zonesRequestExVal,
	}
}