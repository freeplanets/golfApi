import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { games, playerDefault } from "src/database/db.interface";

const player1: playerDefault = {
	playerName: '李小明',
	hcp: '+2',
	fullHcp: '',
	allowance: 1,
	hcpRound: false,
}

const player2: playerDefault = {
	playerName: '張小四',
	hcp: '5',
	fullHcp: '',
	allowance: 1,
	hcpRound: false,
}

const player3: playerDefault = {
	playerName: '王大大',
	hcp: '10',
	fullHcp: '',
	allowance: 1,
	hcpRound: false,
}

const player4: playerDefault = {
	playerName: '周明人',
	hcp: '20',
	fullHcp: '',
	allowance: 0.7,
	hcpRound: false,
}

const playerDefaultExVal:Partial<games> = {
	playerDefaults: [player1, player2, player3, player4],
}

export const playerDefaultEx:Record<'Request', ExampleObject> = {
	Request: {
		value: playerDefaultExVal,
	}
}

