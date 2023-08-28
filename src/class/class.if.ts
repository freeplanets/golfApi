import { player, playerGameData, sideGame } from "../database/db.interface";

export interface createPlayerGameData {
	create(): playerGameData[];
}

export interface sideGameCreate {
	create(): sideGame;
}

export interface playerScore {
  playerName: string;
  playerOrder:number;
  gross:number;
	parDiff:number;
}
export interface holesPlayerScore {
	holeNo:number;
	scores:playerScore[],
}
export interface iScoreLine {
	f1:number;
	f2:number;
	f3:number;
	f4:number;
}
