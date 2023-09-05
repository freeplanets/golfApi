import { player, score } from "../../database/db.interface";
import HolesUpdater from "./HolesUpdater";

export default class PlayerUpdater {
	private holes:HolesUpdater;
	constructor(private oldPlayer:player){
		this.holes = new HolesUpdater(this.oldPlayer.holes);
		//console.log('playerupdater:', this.oldPlayer.playerName);
	}
	update(scores:Partial<score>[]){
		this.holes.update(scores);
		this.oldPlayer.gross += this.holes.grossGap;
		this.oldPlayer.backGross += this.holes.backGrossGap;
		this.oldPlayer.frontGross += this.holes.frontGrossGap;
		this.oldPlayer.parDiff += this.holes.parDiffGap;
	}
	get playerName() {
		return this.oldPlayer.playerName;
	}
	get updatedHoles() {
		return this.holes.updatedHoles;
	}
}