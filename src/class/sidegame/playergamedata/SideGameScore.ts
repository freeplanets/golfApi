import { createPlayerGameData } from "../../class.if";
import { sideGame, playerGameData, games } from "../../../database/db.interface";
import HcpAssign from "../handicap/HcpAssign";
import { hashKey } from "../../../function/Commands";

export default class SideGameScore implements createPlayerGameData {
	constructor(private sideG:sideGame, private game:Partial<games>, private startHoleNo:number){}
	create(): playerGameData[] {
		const sideG = this.sideG;
		if (!sideG.sidegameid) sideG.sidegameid = hashKey();
		if (!sideG.wager || sideG.wager < 1) sideG.wager = 1;
		this.game.players.forEach((player) => {
			const fIdx = sideG.playerGameData.findIndex((itm) => itm.playerName === player.playerName);
			if (fIdx > -1) {
				const f = sideG.playerGameData[fIdx]; 
				if (!f.playOrder) f.playOrder = fIdx + 1;
				if (typeof f.playOrder === 'string') f.playOrder = parseInt(f.playOrder, 10);
				f.holes = player.holes.map((hole) => {
					return { ...hole };
				});
			}
		});
		return new HcpAssign(sideG, this.game, this.startHoleNo).doit();
	}
}