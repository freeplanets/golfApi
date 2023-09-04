import { createPlayerGameData } from "../../class.if";
import { sideGame, playerGameData, games } from "../../../database/db.interface";
import HcpAssign from "../handicap/HcpAssign";
import { hashKey } from "../../../function/Commands";

export default class SideGameScore implements createPlayerGameData {
	constructor(private sideG:sideGame, private game:Partial<games>){}
	create(): playerGameData[] {
		const sideG = this.sideG;
		sideG.sidegameid = hashKey();
		this.game.players.forEach((player) => {
			const f = sideG.playerGameData.find((itm) => itm.playerName === player.playerName);
			if (f) {
				f.holes = player.holes.map((hole) => {
					return { ...hole };
				});
			}
		});
		return new HcpAssign(sideG, this.game).doit();
	}
}