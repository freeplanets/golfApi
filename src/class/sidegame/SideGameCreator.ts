import { sideGames } from "../../models/enum";
import { games, sideGame } from "../../database/db.interface";
import NassauOrSixesScore from "./playergamedata/NassauOrSixesScore";
import SideGameScore from "./playergamedata/SideGameScore";
import { createPlayerGameData, sideGameCreate } from "../class.if";

export default class SideGameCreator implements sideGameCreate {
	private gameScores:createPlayerGameData;
	// constructor(private sideG:sideGame, private playerDfs:playerDefault[], private players:player[]){
	constructor(private sideG:sideGame, private game:Partial<games>) {
		switch(this.sideG.sideGameName) {
			case sideGames.NASSAU:
			case sideGames.SIXES:
				this.gameScores = new NassauOrSixesScore(this.sideG, this.game);
				break;
			default:
				this.gameScores = new SideGameScore(this.sideG, this.game);
		}
	}
	create(): sideGame {
		this.sideG.playerGameData = this.gameScores.create();
		this.sideG.playerGameData.forEach((itm) => {
			console.log(itm.playerName, itm.hcp, itm.extraInfo); 
		})	
		return this.sideG;
	}
}