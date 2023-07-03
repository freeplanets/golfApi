import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { zoneInfo } from "src/models/if";

const zoneInfoExVal:zoneInfo = {
	ClubID: 'TW01',
	ZoneID: 'WEST',
	ZoneName: '西區',
}

export const zoneInfoEx:Record<'Request', ExampleObject> = {
	Request: {
		value: zoneInfoExVal,
	}
}