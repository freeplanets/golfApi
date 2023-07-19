import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { Zone } from "../../../database/db.interface";

const tee1 = 'WhiteTee';
const tee2 = 'BlueTee';
const tee3 = 'RedTee';
const tees: string[] = [tee1, tee2, tee3];
const zoneExVal:Zone = {
	id: '',
	zoneid: '01',
	clubid: 'linkougolf',
	tees: tees,
	name: 'West',
}

export const zoneEx:Record<'Request', ExampleObject> = {
	Request: {
		value: zoneExVal,
	}
}