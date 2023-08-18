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