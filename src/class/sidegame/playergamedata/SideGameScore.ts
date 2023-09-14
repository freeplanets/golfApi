import { createPlayerGameData } from "../../class.if";
import { sideGame, playerGameData, games } from "../../../database/db.interface";
import HcpAssign from "../handicap/HcpAssign";
import { hashKey } from "../../../function/Commands";

export default class SideGameScore implements createPlayerGameData {
	constructor(private sideG:sideGame, private game:Partial<games>, private startHoleNo:number){}
	create(): playerGameData[] {
		const sideG = this.sideG;
		if (!sideG.sidegameid) {
			sideG.sidegameid = hashKey();
			this.game.players.forEach((player) => {
				const f = sideG.playerGameData.find((itm) => itm.playerName === player.playerName);
				if (f) {
					if (!f.playOrder) f.playOrder = 0;
					if (typeof f.playOrder === 'string') f.playOrder = parseInt(f.playOrder, 10);
					f.holes = player.holes.map((hole) => {
						return { ...hole };
					});
				}
			});
		}
		return new HcpAssign(sideG, this.game, this.startHoleNo).doit();
	}
}