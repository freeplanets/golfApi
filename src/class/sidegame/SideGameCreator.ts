// import { sideGames } from "../../models/enum";
import { games, sideGame } from "../../database/db.interface";
// import NassauOrSixesScore from "./playergamedata/NassauOrSixesScore";
import SideGameScore from "./playergamedata/SideGameScore";
import { createPlayerGameData, sideGameCreate } from "../class.if";
import { sideGameFormat, sideGames } from "../../models/enum";

interface gObj {
	[key:string]:number;
}

export default class SideGameCreator implements sideGameCreate {
	private gameScores:createPlayerGameData;
	// constructor(private sideG:sideGame, private playerDfs:playerDefault[], private players:player[]){
	constructor(private sideG:sideGame, private game:Partial<games>) {
		this.gameScores = new SideGameScore(this.sideG, this.game);
		/*
		switch(this.sideG.sideGameName) {
			case sideGames.NASSAU:
			case sideGames.SIXES:
				this.gameScores = new NassauOrSixesScore(this.sideG, this.game);
				break;
			default:
				this.gameScores = new SideGameScore(this.sideG, this.game);
		}
		*/
	}
	create(): sideGame | false {
		const chkPlayerInGame = this.checkData();
		if (!chkPlayerInGame) return false;
		this.sideG.playerGameData = this.gameScores.create();
		this.sideG.playerGameData.forEach((itm) => {
			console.log(itm.playerName, itm.hcp, itm.extraInfo); 
		});
		this.sideG.extraInfo = {};	
		return this.sideG;
	}
	private checkData():boolean {
		switch(this.sideG.sideGameName) {
			case sideGames.HESSEIN:
				// 至少三人參加
				return this.numberOfPlayersCheck(3);
			case sideGames.LAS_VEGAS:
			case sideGames.SIXES:
				// 四人全部參加
				return this.numberOfPlayersCheck(4);
			case sideGames.BIRDIES:
			case sideGames.EAGLES:
			case sideGames.PARS:
				this.sideG.format = sideGameFormat.individual;
			default:
				return this.checkAll();
		}
	}
	private checkAll() {
		let ans = false;
		if (this.sideG.format === sideGameFormat.individual) {
			ans = this.numberOfPlayersCheck(2);
		} else {
			ans = this.groupCheck();
		}
		return ans;
	}	
	private numberOfPlayersCheck(count:number):boolean {
		let cnt = 0;
		this.sideG.playerGameData.forEach((player) => {
			if (player.selected) cnt++;
		});
		return cnt >= count;
	}
	private groupCheck(){
		const chk = this.numberOfPlayersCheck(4);
		if (!chk) return false;
		const g:gObj = {}
		this.sideG.playerGameData.forEach((player) => {
			if (!g[`${player.betterballGroup}`]) g[`${player.betterballGroup}`] = 1;
			else g[`${player.betterballGroup}`]+=1;
		});
		return g.A === g.B;
	}
}