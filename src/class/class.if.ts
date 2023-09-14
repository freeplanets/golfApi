import { playerGameData, sideGame } from "../database/db.interface";

export interface createPlayerGameData {
	create(): playerGameData[];
}

export interface sideGameCreate {
	create(): sideGame | false;
}

export interface playerScore {
  playerName: string;
  playerOrder:number;
  gross:number;
	parDiff:number;
}
export interface holesPlayerScore {
	holeNo:number;
	scores:playerScore[];
	forAffectTheNextGame?:boolean;
	changedHoleNo?:number;	// 給會影響下洞計算小遊戲檢查是否往下重算
}
export interface iScoreLine {
	f0:number;
	f1:number;
	f2:number;
	f3?:number;
	f4?:number;
}
/*
export interface ISideGameScore {
	calc(holeScore:holesPlayerScore):void;
	update(pgd:playerGameData, holeNo:number, points:number):void;
	getResult():{ title:scoreLine, total:scoreLine, gameDetail:scoreLine[] };
	ResultByIndividual(title:scoreLine, scores:iScoreLine[], gameDetail:scoreLine[],
		isplayed:boolean[]): {title:scoreLine, total:scoreLine, gameDetail:scoreLine[] };	
	resultByBetterGame(group:string[], title:scoreLine, scores:iScoreLine[],
		gameDetail:scoreLine[]): {title:scoreLine, total:scoreLine, gameDetail:scoreLine[] };
	createGameDetail(f0:string, f1:string, f2:string, f3:string, f4:string, f5:string, f6:string, f7:string,
		f8:string, f9:string, f10:string, f11:string, f12:string, f13:string, f14:string, f15:string, f16:string,
		f17:string, f18:string, f19:string):scoreLine;
	newline(f0:string, f1:string, f2:string, f3:string, f4:string):scoreLine;
	newILine(f0:number, f1:number,f2:number, f3:number, f4:number):iScoreLine;
	playerDiff(score:iScoreLine, pos:number, isplayed:boolean[]):number;
	scoreDiff(s:number[]):number;
}
*/