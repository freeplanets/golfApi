import { holesPlayerScore } from "../class.if";
import ASideGameScore from "./ASideGameScore";


/**
 * 比桿賽 (Stroke play)
以18洞的總桿數扣除球員的差點計算。
 */
export default class StrokePlay extends ASideGameScore {
	calc(holeScore: holesPlayerScore): void {
		// if ( this.CalcCounter === 1  && !this.forAffectTheNextGame) return;
		// this.CalcCounter += 1;		
		const scores:number[] = [];
		holeScore.scores.forEach((player)=>{
			if (player.gross>0) {
				const f = this.sg.playerGameData.find((itm) => itm.playerName === player.playerName);
				console.log(f.playerName, f.extraInfo.hcp);
				if (f) {
					let points = 0;
					if (f.selected) {
						const handicap = f.extraInfo.hcp[holeScore.holeNo-1] | 0;
						points = player.gross + handicap;
					}
					scores.push(points);
					this.update(f, holeScore.holeNo, points)
				}
			}
		});
		console.log('strokeplay calc end', holeScore, scores);
		this.updateResult(holeScore.holeNo, scores);	
	}
}