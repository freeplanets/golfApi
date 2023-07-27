import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { caddie, games, player, playerDefault, playerGameData, score, sideGame } from "src/database/db.interface";
import { HcpType, sideGameFormat, sideGameGroup, sideGames } from "src/models/enum";
import { commonResWithData } from "src/models/if";

const caddies:caddie[] = [
	{
		caddieid: '001',
	}
];
const playerD: playerDefault = {
  playerName: 'James',
  tee: 'ReadTee',
  fullHcp: '20',
  allowance: 100,
  hcp: '20',
  hcpRound: false,
}
const scores1: score = {
  holeNo:1,
  zoneid:'zone1',
  fairwayno: 1,
  gross: 0,
  extraInfo:{},
}
const playerGD: playerGameData = {
  selected: true,
  playerName: 'James',
  hcp:'20',
  betterballGroup: sideGameGroup.NONE,
  points: 0,
  holes:[scores1],
}
const playerO: player = {
  playerName: 'James',
  hcp: '20',
  tee: 'RedTee',
  playerOrder: 1,
  gross: 0,
  holes: [scores1],
  extra: {},	
}
const sideGameO:sideGame = {
  sideGameName:sideGames.STABLEFORD,
  format: sideGameFormat.individual,
  wager: 3,
  hcpType: HcpType.FullHcp,
  playerGameData:[playerGD],	
}
const gameDataExVal: games = {
	gameid: 'gamehashkey',
  siteid: 'linkougolf',
  courseid: 'courseid',
  outZone: 'zoneid1',
  inZone: 'zoneid2',
  par: 72,
  rating: 75,
  slope: 56,
  carts: ['cartid'],
  stepInZone: 'zoneid1',
  stepInFairway: 1,
  esttimatedStartTime: 1690387200,
  startTime: 0,
  endTime: 0,
  players: [playerO],
  caddies: caddies,
  playerDefaults: [playerD],
  sideGames: [sideGameO],	
}

const gameRexExVal:commonResWithData<games> = {
	errcode: '0',
	error: {
		message: 'some messgae',
		extra: {},
	},
	data: gameDataExVal,
}

export const gameResEx:Record<'Response', ExampleObject> = {
	Response: {
		value: gameRexExVal,
	}
}