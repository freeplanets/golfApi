import { score } from "src/database/db.interface";
import ScoreUpdater from "./ScoreUpdater";

export default class HolesUpdater {
	private updated:number[];
	private scoreObj:ScoreUpdater[];
	private total:number;
	private frontTotal:number;
	private backTotal:number;
	private pDiff:number;
	constructor(private oldHoles:score[]){
		this.updated=[];
		this.total=0;
		this.frontTotal=0;
		this.backTotal=0;
		this.pDiff=0;
		this.scoreObj = this.oldHoles.map((score) => new ScoreUpdater(score));
	}
	update(newHoles:score[]){
		newHoles.forEach((itm) => {
			this.total += itm.gross;
			if (itm.holeNo<10) {
				this.frontTotal += itm.gross;
			} else {
				this.frontTotal += itm.gross;
			}
			itm.parDiff = itm.gross - itm.par;
			this.pDiff += itm.parDiff;
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
	get frontGross():number {
		return this.frontTotal;
	}
	get backGross():number {
		return this.backTotal;
	}
	get parDiff():number {
		return this.pDiff;
	}
	get updatedHoles():number[] {
		return this.updated;
	}
}