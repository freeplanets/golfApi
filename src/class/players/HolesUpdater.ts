import { score } from "src/database/db.interface";
import ScoreUpdater from "./ScoreUpdater";

export default class HolesUpdater {
	private updated:number[];
	private scoreObj:ScoreUpdater[];
	private total:number;
	constructor(private oldHoles:score[]){
		this.updated=[];
		this.total=0;
		this.scoreObj = this.oldHoles.map((score) => new ScoreUpdater(score));
	}
	update(newHoles:score[]){
		newHoles.forEach((itm) => {
			this.total += itm.gross;
			const f = this.scoreObj.find((so)=>so.heloNo === itm.holeNo);
			if (f) {
				f.update(itm);
				if (f.isUpdated) this.updated.push(f.heloNo);
			}
		});
	}
	get gross():number {
		return this.total;
	}
	get updatedHoles():number[] {
		return this.updated;
	}
}