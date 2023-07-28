import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { fairwayObject, teeObject, zones } from "../../../database/db.interface";
import { fairwayInfoEx } from "./fairwayInfoEx";
import { commonResWithData } from "src/models/if";
const tee1:teeObject = {
	teeName: 'WhiteTee',
	teeColor: 'White',
};
const tee2:teeObject = {
	teeName: 'BlueTee',
	teeColor: 'Blue',
};
const tee3:teeObject = {
	teeName: 'RedTee',
	teeColor: 'Red',
};

const zoneExVal:Partial<zones> = {
	name: 'West',
	siteid: 'linkougolf',
	tees: [tee1, tee2, tee3],
	fairways: createFairways(),
	refNo: 0,
}
const zonesResExVal:commonResWithData<Partial<zones>> = {
	errcode: '0',
	error: {
		message: 'some message',
		extra: {},
	},
	data: zoneExVal
}
export const zoneEx:Record<'Request', ExampleObject> = {
	Request: {
		value: zoneExVal,
	}
}
export const zonesResEx:Record<'Response', ExampleObject> = {
	Response: {
		value: zonesResExVal,
	}
}

function createFairways():fairwayObject[] {
	const fways:fairwayObject[]=[];
	for (let i=0; i<9; i+=1) {
		const fway:fairwayObject = { ...fairwayInfoEx.Request.value };
		fway.fairwayno = i + 1;
		fways.push(fway);
	}
	return fways;
}