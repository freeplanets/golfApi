import { holesPlayerScore } from "../class.if";
import ASideGameScore from "./ASideGameScore";

/**
 * 老鷹(Eagles)
打出老鷹(Eagle)或更好成績，則可獲得積分。
可以根據球員差點之間的差異，依讓分規則計算。
老鷹球(Eagle)是打出低於標準桿(Par)2桿．
 */
export default class Eagles extends ASideGameScore {
	calc(holeScore: holesPlayerScore): void {
		if (holeScore.forAffectTheNextGame !== this.forAffectTheNextGame) return;
		const scores:number[] = [];
		holeScore.scores.forEach((player)=>{
			if (player.gross>0) {
				const f = this.sg.playerGameData.find((itm) => itm.playerName === player.playerName);
				if (f) {
					let points = 0;
					if (f.selected) {
						const handicap = f.extraInfo.hcp[holeScore.holeNo-1] | 0;
						points = (player.parDiff + handicap) < -1 ? 1 : 0;
						// f.points = (this.sg.wager | 1) * points;	
					}
					scores.push(points);
					this.update(f, holeScore.holeNo, points)
				}
			}
		});
		this.updateResult(holeScore.holeNo, scores);		
	}
}