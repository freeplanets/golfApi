import { scoreLine } from "../../function/func.interface";
import { holesPlayerScore, iScoreLine } from "../class.if";
import ASideGameScore from "./ASideGameScore";
import StrokePlay from "./StrokePlay";

/**
 * 拿騷(Nassau 2-2-2)
Nassau本質上是三個獨立的投注。 投注前九洞（第 1-9 洞）、後九洞（第 10-18 洞）和總共 18 個洞的最佳桿數。
可以根據球員差點之間的差異，依讓分規則計算。
 */
export default class Nassau extends ASideGameScore { //extends StrokePlay {
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
	getResult(): { title: scoreLine; total: scoreLine; gameDetail: scoreLine[]; } {
		const title:scoreLine = this.newline('HOLE');
		const total:scoreLine = this.newline(this.sg.sideGameName);
		const gameDetail:scoreLine[] = [];
		const first9 = { f1:0, f2:0, f3:0, f4:0 };
		const last9 = { f1:0, f2:0, f3:0, f4:0 };
		const whole18 = { f1:0, f2:0, f3:0, f4:0 };
		this.sg.playerGameData.forEach((player, idx) => {
			title[`f${idx}`] = player.playerName;
			player.holes.forEach((score) => {
				gameDetail[score.holeNo-1][`f${idx}`]=`${score.gross}`;
				if (score.holeNo > 9) {
					last9[`f${idx}`] +=  score.gross;
				} else {
					first9[`f${idx}`] +=  score.gross;
				}
				whole18[`f${idx}`] +=  score.gross;
			});
		});		
		return { title, total, gameDetail }		
	}
	protected findMax(obj:iScoreLine, scoreL:scoreLine) {
		const arr:number[] = Object.keys(obj).map((key) => obj[key]); 
		const max = Math.max(...arr);
		if (arr.filter((x) => x === max).length > 1) {
			
		} else {
			arr.forEach((v, idx) => {
				if (v === max) scoreL[`f${idx + 1}`] = 1 * this.sg.wager;
			});			
		}
	}
}