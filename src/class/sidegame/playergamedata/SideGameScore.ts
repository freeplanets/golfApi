import { sideGame, playerGameData, player } from "src/database/db.interface";
import { createPlayerGameData } from "../sideGame.if";

export default class SideGameScore implements createPlayerGameData {
	constructor(private sideG:sideGame, private players:player[]){}
	create(): playerGameData[] {
		const sideG = this.sideG;
		this.players.forEach((player) => {
			const f = sideG.playerGameData.find((itm) => itm.playerName === player.playerName);
			if (f) {
				f.holes = player.holes.map((hole) => {
					return { ...hole };
				});
			}
		});
		return sideG.playerGameData;
	}
}