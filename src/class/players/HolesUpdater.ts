import { score } from "../../database/db.interface";
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
	update(newHoles:Partial<score>[]){
		console.log('HolesUpdater update', newHoles);
		newHoles.forEach((itm) => {
			const f = this.scoreObj.find((so)=>so.holeNo === itm.holeNo);
			if (f) {
				f.update(itm);
				if (f.isUpdated) {
					this.updated.push(f.holeNo);
					this.total += f.GrossGap;
					if (f.holeNo > 9) this.backTotal += f.GrossGap;
					else this.frontTotal += f.GrossGap;
					this.pDiff += f.ParDiffGap;
				}
			}
		});
	}
	get grossGap():number {
		return this.total;
	}
	get frontGrossGap():number {
		return this.frontTotal;
	}
	get backGrossGap():number {
		return this.backTotal;
	}
	get parDiffGap():number {
		return this.pDiff;
	}
	get updatedHoles():number[] {
		// console.log('updatedHoles', this.updated);
		return this.updated;
	}
}