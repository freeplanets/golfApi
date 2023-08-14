import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { games, playerDefault } from "src/database/db.interface";

const player1: playerDefault = {
	playerName: '李小明',
	hcp: '',
	fullHcp: '+2',
	allowance: 1,
	hcpRound: false,
}

const player2: playerDefault = {
	playerName: '張小四',
	hcp: '',
	fullHcp: '5',
	allowance: 1,
	hcpRound: false,
}

const player3: playerDefault = {
	playerName: '王大大',
	hcp: '',
	fullHcp: '10',
	allowance: 1,
	hcpRound: false,
}

const player4: playerDefault = {
	playerName: '周明人',
	hcp: '',
	fullHcp: '20',
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

