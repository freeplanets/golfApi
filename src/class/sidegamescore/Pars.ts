import { holesPlayerScore } from "../class.if";
import ASideGameScore from "./ASideGameScore";

/**
 * 標準桿(Pars)
打出標準桿(Par)或更好成績，則可獲得積分。
可以根據球員差點之間的差異，依讓分規則計算。
帕(Par):以這個球洞規定的桿數，完成這個球洞
 */
export default class Pars extends ASideGameScore {
	calc(holeScore: holesPlayerScore): void {
		holeScore.scores.forEach((player)=>{
			if (player.gross>0) {
				const f = this.sg.playerGameData.find((itm) => itm.playerName === player.playerName);
				if (f) {
					let points = 0;
					if (f.selected) {
						const handicap = f.extraInfo.hcp[holeScore.holeNo-1] | 0;
						points = (player.parDiff - handicap) < 1 ? 1 : 0;
						// f.points = (this.sg.wager | 1) * points;	
					}
					this.update(f, holeScore.holeNo, points)
				}
			}
		});		
	}
}