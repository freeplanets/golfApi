import { sideGames } from "../../models/enum";
import { sideGame } from "../../database/db.interface";

export default class SideGameScoreFactory {
	constructor(private sideGs:sideGame[]){
		sideGs.forEach((sideGame) => {
			switch(sideGame.sideGameName){
				case sideGames.STABLEFORD:
				case sideGames.MODIFIED_STABLEFORD:
			}
		})
	}
}