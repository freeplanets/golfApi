import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { checkInData, client, gameZones, stepIn } from "src/models/if";

const clt:client = {
	ID: 'M00001',
	checkInID:'D00001',
	name: '王小明',
	swingOrder: 1,
}
const zone:gameZones = {
	out: 'West',
	in: 'South',
}
const stepin: stepIn = {
	ZoneID: 'West',
	FairwayID: 3,
}
const checkDataExVal: checkInData = {
	ClubID: 'TW01',
	GroupID: 'group0001',
	players: [clt],
	zones: zone,
	start: stepin,
	inTimestamp: 1688486400,
}
export const checkDataEx:Record<'Response', ExampleObject> = {
	Response: {
		value: checkDataExVal,
	}
}