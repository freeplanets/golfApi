import { player } from "src/database/db.interface";
import HolesUpdater from "./HolesUpdater";

export default class PlayerUpdater {
	private holes:HolesUpdater;
	constructor(private oldPlayer:player){
		this.holes = new HolesUpdater(this.oldPlayer.holes);
	}
	update(newPlayer:player){
		if (newPlayer.playerName === this.playerName) {
			this.holes.update(newPlayer.holes);
			newPlayer.gross = this.holes.gross;
			newPlayer.frontGross = this.holes.frontGross;
			newPlayer.backGross = this.holes.backGross;
			newPlayer.parDiff = this.holes.parDiff;
		}
	}
	get gross() {
		return this.holes.gross;
	}
	get playerName() {
		return this.oldPlayer.playerName;
	}
	get updatedHoles() {
		return this.holes.updatedHoles;
	}
}