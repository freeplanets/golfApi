import { holesPlayerScore } from "../class.if";
import ASideGameScore from "./ASideGameScore";

/**
 * 比桿賽 (Stroke play)
以18洞的總桿數扣除球員的差點計算。
 */
export default class StrokePlay extends ASideGameScore {
	calc(holeScore: holesPlayerScore): void {
		holeScore.scores.forEach((player)=>{
			if (player.gross>0) {
				const f = this.sg.playerGameData.find((itm) => itm.playerName === player.playerName);
				if (f) {
					const handicap = f.extraInfo.hcp[holeScore.holeNo-1] | 0;
					let points = player.gross - handicap;
					// f.points = (this.sg.wager | 1) * points;
					this.update(f, holeScore.holeNo, points)
				}
			}
		});		
	}
}