import { holesPlayerScore, iScoreLine } from "../class.if";
import ASideGameScore from "./ASideGameScore";

/**
 * 小鳥(Birdies)
打出小鳥(Birdie)或更好成績，則可獲得積分。
可以根據球員差點之間的差異，依讓分規則計算。
小鳥球(Birdie)是打出低於標準桿(Par)1桿．
 */
export default class Birdies extends ASideGameScore {
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
						points = (player.parDiff + handicap) < 0 ? 1 : 0;
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