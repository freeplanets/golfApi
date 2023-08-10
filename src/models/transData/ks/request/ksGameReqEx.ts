import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { ksGameReq } from "../ks.interface";

const ksGameReqExVal:ksGameReq = {
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
		},
		{
			name: "王大大",
			tee: {
				name: "White"
			},
			extra: {
				memberId: "M00003",
				checkInId: "D00003"
			}
		},
		{
			name: "周明人",
			tee: {
				name: "Red"
			},
			extra: {
				memberId: "G00001",
				checkInId: "D00004"
			}
		}		
	],
	teeOffTimestamp: Math.round(new Date().getTime() / 1000),
}
export const ksGameReqEx:Record<'Request', ExampleObject> = {
	Request: {
		value: ksGameReqExVal,
	}
}