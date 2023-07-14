import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { Zone } from "src/database/db.interface";

const zoneExVal:Zone = {
	id: '',
	zoneid: '01',
	clubid: 'linkougolf',
	name: 'West',
}

export const zoneEx:Record<'Request', ExampleObject> = {
	Request: {
		value: zoneExVal,
	}
}