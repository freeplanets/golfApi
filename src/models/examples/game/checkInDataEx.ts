import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
 import { checkInData, client, endScore, gameZones, holeScore, playScore, sideGame, sideGameHcp, stepIn } from "../../if";
import { sideGames } from "../../enum";

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
const hole:holeScore = {
	ZoneID: 'West',
	FairwayID: 3,
	Par: 4,
	Handicap: 8,
	scores: [plays],
	PlayOrder: 2,
}
const score:endScore = {
	gross: 81,
	holes: [hole],
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
	NoHcp: false,
	FullHcp: false,
	HcpDiff: true,
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
export const checkDataEx:Record<'Response', ExampleObject> = {
	Response: {
		value: checkDataExVal,
	}
}