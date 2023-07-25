import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { InDataTw01 } from "./checkin.interface";

const inDataExVal:InDataTw01 = {
	caddie: { number: '01'},
	zones: [
		{number:0},
		{number:2},
	],
	players: [
		{
			name: "李小明",
			tee: {
				name: "White"
			},
			extra: {
				memberId: "M00001",
				checkInId: "D00001"
			}
		},
		{
			name: "張小四",
			tee: {
				name: "Red"
			},
			extra: {
				memberId: "M00002",
				checkInId: "D00002"
			}
		}		
	],
	teeOffTimestamp: 1620029793,
}
export const inDataEx:Record<'Request', ExampleObject> = {
	Request: {
		value: inDataExVal,
	}
}