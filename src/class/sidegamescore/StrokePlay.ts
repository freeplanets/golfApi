import { holesPlayerScore } from "../class.if";
import ASideGameScore from "./ASideGameScore";

/**
 * 比桿賽 (Stroke play)
以18洞的總桿數扣除球員的差點計算。
 */
export default class StrokePlay extends ASideGameScore {
	calc(holeScore: holesPlayerScore): void {
		// console.log('strokeplay calc start', holeScore.holeNo, this.forAffectTheNextGame);	
		// if (holeScore.forAffectTheNextGame !== this.forAffectTheNextGame) return;
		const scores:number[] = [];
		holeScore.scores.forEach((player)=>{
			if (player.gross>0) {
				const f = this.sg.playerGameData.find((itm) => itm.playerName === player.playerName);
				if (f) {
					let points = 0;
					if (f.selected) {
						const handicap = f.extraInfo.hcp[holeScore.holeNo-1] | 0;
						points = player.gross + handicap;
						// f.points = (this.sg.wager | 1) * points;
					}
					scores.push(points);
					this.update(f, holeScore.holeNo, points)
				}
			}
		});
		// console.log('strokeplay calc end', holeScore.holeNo);
		this.updateResult(holeScore.holeNo, scores);	
	}
}