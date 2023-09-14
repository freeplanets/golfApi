import { createPlayerGameData } from "../../../class/class.if";
import { sideGame, playerGameData, games } from "../../../database/db.interface";
import HcpAssign from "../handicap/HcpAssign";

export default class NassauOrSixesScore implements createPlayerGameData {
	constructor(private sideG:sideGame, private game:Partial<games>, private startHoleNo:number){
	}
	create(): playerGameData[] {
		this.sideG.playerGameData.map((player) => {
			player.holes = [1, 2, 3].map((id) => {
				return {
					holeNo: id,
					zoneid: '',
					fairwayno: 0,
					par:0,
					handicap: 0,
					gross: 0,
					parDiff: 0,
				}
			});
			return player
		});
		return new HcpAssign(this.sideG, this.game, this.startHoleNo).doit();
	}
}