import { HcpType, sideGames } from "../../models/enum";
import { player, playerDefault, sideGame } from "../../database/db.interface";
import { createPlayerGameData, sideGameCreate }  from "./sideGame.if";
import NassauOrSixesScore from "./playergamedata/NassauOrSixesScore";
import SideGameScore from "./playergamedata/SideGameScore";

export default class SideGameCreator implements sideGameCreate {
	private gameScores:createPlayerGameData;
	constructor(private sideG:sideGame, private playerDfs:playerDefault[], private players:player[]){
		switch(this.sideG.sideGameName) {
			case sideGames.NASSAU:
			case sideGames.SIXES:
				this.gameScores = new NassauOrSixesScore(this.sideG);
				break;
			default:
				this.gameScores = new SideGameScore(this.sideG, this.players);
		}
	}
	create(): sideGame {

		return {
			sideGameName: sideGames.BIRDIES,
			format: null,
			wager: 1,
			hcpType: HcpType.NoHcp,
			playerGameData: [],
		}
	}
}