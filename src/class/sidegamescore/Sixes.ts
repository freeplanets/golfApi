import { scoreLine } from "../../function/func.interface";
import Nassau, { tmpScore } from "./Nassau";
import { sideGameFormat } from "../../models/enum";
import { sideGame } from "../../database/db.interface";

/**
 * 六局比桿賽 Sixes
每6局更換分組。本質上是三個獨立的投注。 投注前6洞（第 1-6 洞）、中6洞（第 7-12 洞）及後6洞（第 13-18 洞）的最佳桿數。
可以根據球員差點之間的差異，依讓分規則計算。
選分組或BetterGame:系統自動分組，前6洞(1&2, 3&4),中6洞(1&3, 2&4)，後6洞(1&4, 2&3)
 */
export default class Sixes extends Nassau {
	constructor(sg:sideGame){
		super(sg);
		this.sg.format = sideGameFormat.team;
		if (this.sg.extraInfo.group.length < 4) {
			this.sg.extraInfo.autoGroup = true;
		}
	}
	protected updateResult(holeNo: number, scores: number[]): void {
		if (scores.length < 4) return;
		const autoGroup = !!this.sg.extraInfo.autoGroup;
		this.sg.extraInfo.group = [
			['A', 'A', 'B', 'B'],
			['A', 'B', 'A', 'B'],
			['A', 'B', 'B', 'A']
		]; 

		let fIdx = 0;
		if (holeNo <= 6) {
			fIdx = 1;
			/*
			if (autoGroup) {
				this.sg.extraInfo.group = ['A', 'A', 'B', 'B']; 
			}
			*/
		} else if (holeNo <= 12) {
			fIdx = 2;
			/*
			if (autoGroup) {
				this.sg.extraInfo.group = ['A', 'B', 'A', 'B'];
			}
			*/
		} else {
			fIdx = 3;
			/*
			if (autoGroup) {
				this.sg.extraInfo.group = ['A', 'B', 'B', 'A'];
			}
			*/
		}
		this.updateResultCal(fIdx, holeNo, scores);
	}	
}