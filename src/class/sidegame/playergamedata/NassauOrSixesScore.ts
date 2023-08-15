import { sideGame, playerGameData } from "src/database/db.interface";
import { createPlayerGameData } from "../sideGame.if";

export default class NassauOrSixesScore implements createPlayerGameData {
	constructor(private sideG:sideGame){}
	create(): playerGameData[] {
		return this.sideG.playerGameData.map((player) => {
			player.holes = [1, 2, 3].map((id) => {
				return {
					holeNo: id,
					zoneid: '',
					fairwayno: 0,
					handicap: 0,
					gross: 0,
				}
			});
			return player
		 });
	}
}