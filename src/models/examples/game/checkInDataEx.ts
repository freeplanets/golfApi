import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
 import { checkInData, client, endScore, gameZones, holeScore, holeScoreWithInfo, partialResult, playScore, sideGame, sideGameHcp, sideGamesData, stepIn, swingResult } from "../../../database/db.interface";
import { HcpType, sideGames } from "../../enum";

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
const plays:playScore = {
	playerID: 'M0001',
	gross: 5,
	SwingOrder: 2,
}
const holeS: holeScore = {
	ZoneID: 'West',
	FairwayID: 3,
	scores: [plays],
	PlayOrder: 2,	
}
const holeSWI:holeScoreWithInfo = {
	...holeS,
	Par: 4,
	Handicap: 8,
}
const score:endScore = {
	gross: 81,
	holes: [holeSWI],
}
const sidegameHcp1: sideGameHcp = {
	PlayerID: 'M0001',
	handicap: 8,
}
const sidegameHcp2: sideGameHcp = {
	PlayerID: 'M0002',
	handicap: 5,
}
const sideGameEnd: endScore = score;

const sidegame:sideGame = {
	name: sideGames.Stableford,
	// NoHcp: false,
	// FullHcp: false,
	// HcpDiff: true,
	HcpType: HcpType.Handicap,
	Hcps: [sidegameHcp1, sidegameHcp2],
	scores: sideGameEnd,
}

const checkDataExVal: checkInData = {
	ClubID: 'TW01',
	GroupID: 'group0001',
	players: [clt],
	zones: zone,
	start: stepin,
	scores: score,
	sideGames: [sidegame],
	inTimestamp: 1688486400,
}
const sideGameRegExVal:sideGamesData = {
	GroupID: 'group002',
	sideGames: [sidegame],
}
const swingR:swingResult = {
	GroupID: 'group002',
	scores: [holeS],
}

const partS: partialResult = {
	GroupID: 'group002',
	scores: score,
	sideGameScores: score,
}
export const checkDataEx:Record<'Response', ExampleObject> = {
	Response: {
		value: checkDataExVal,
	}
}
export const sideGameRegEx:Record<'Request', ExampleObject> = {
	Request: {
		value: sideGameRegExVal,
	}
}
export const swingResultEx:Record<'Request', ExampleObject> = {
	Request: {
		value: swingR,
	}
}
export const partialResultEx:Record<'Response', ExampleObject> = {
	Response: {
		value: partS,
	}
}