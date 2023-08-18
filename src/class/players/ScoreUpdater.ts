import { score } from "src/database/db.interface";

export default class ScoreUpdater {
	private Updated=false;
	constructor(private oldScore:score){}
	update(score:score){
		if (this.oldScore.gross != score.gross) this.Updated = true;
	}
	get heloNo() {
		return this.oldScore.holeNo;
	}
	get isUpdated() {
		return this.Updated;
	}
}