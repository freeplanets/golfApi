import { player } from "src/database/db.interface";
import PlayerUpdater from "./playerUpdater";

export default class ScoresUpdater {
	private playerObjs:PlayerUpdater[];
	private updatedHoles:number[];
	constructor(private newPlayers:player[], private oldPlayers:player[]){
		this.updatedHoles = [];
		this.playerObjs = this.oldPlayers.map((itm) => new PlayerUpdater(itm));
		this.update();
	}
	private update() {
		this.newPlayers.forEach((itm) => {
			const f = this.playerObjs.find((p) => p.playerName === itm.playerName);
			if (f) {
				f.update(itm);
				itm.gross = f.gross;
				this.checkUpdatedHoles(f.updatedHoles);
			}
		});
	}
	private checkUpdatedHoles(holes:number[]) {
		holes.forEach((no) => {
			const f = this.updatedHoles.find((hole) => hole === no);
			if (!f) this.updatedHoles.push(no);
		});
		if (this.updatedHoles.length>0) {
			this.updatedHoles.sort((a, b) => a - b);
		}
	}
	getScores(holeNo:number) {
		this.newPlayers.map((player) => {
			const tmp = {
				playerName: player.playerName,
				gross: 0,
			}
			const f = player.holes.find((hole) => hole.holeNo === holeNo);
			if (f) {
				tmp.gross = f.gross;
			}
			return tmp;
		})
	}
	get UpdatedHoles() {
		if (this.updatedHoles.length > 0) {
			return this.updatedHoles[0];
		}
		return 0;
	}
}