import { score } from "../../database/db.interface";

export default class ScoreUpdater {
	private Updated=false;
	private oldGross=0;
	private oldParDiff=0;
	private grossGap = 0;
	private pardiffGap = 0;
	constructor(private oldScore:score){
		this.oldGross = oldScore.gross;
		this.oldParDiff = oldScore.parDiff;
	}
	update(score:Partial<score>){
		if (this.holeNo === score.holeNo) {
			if (this.oldGross !== score.gross) {
				this.Updated = true;
				this.oldScore.gross = score.gross;
				this.oldScore.parDiff = this.oldScore.gross - this.oldScore.par;
				this.grossGap = this.oldScore.gross - this.oldGross;
				this.pardiffGap = this.oldScore.parDiff - this.oldParDiff;
			}
		}
	}
	get holeNo() {
		return this.oldScore.holeNo;
	}
	get isUpdated() {
		return this.Updated;
	}
	get GrossGap() {
		return this.grossGap;
	}
	get ParDiffGap() {
		return this.pardiffGap;
	}
}