import { sideGame } from "../../database/db.interface";
import { holesPlayerScore } from "../class.if";
import ASideGameScore from "./ASideGameScore";

/**
 * 史特伯福分數(Stableford)
根據每個洞的淨桿數（差點調整後）來計算積分如下：
6分—低於四桿
5分—低於三桿
4分—低於兩桿
3分—低於一桿
2分—平標準桿
1分—超過一桿
0分—超過兩桿或更多
 */
export default class Stableford extends ASideGameScore {
	constructor(sg:sideGame) {
		super(sg);
		this.highWin = true;
	}
	calc(holeScore: holesPlayerScore): void {
		//if ( this.CalcCounter === 1  && !this.forAffectTheNextGame) return;
		//this.CalcCounter += 1;		
		const scores:number[] = [];
		holeScore.scores.forEach((player)=>{
			if (player.gross>0) {
				const f = this.sg.playerGameData.find((itm) => itm.playerName === player.playerName);
				// console.log('info:', f.playerName ,f.extraInfo);
				if (f) {
					let points = 0;
					if (f.selected) {
						const handicap = f.extraInfo.hcp[holeScore.holeNo-1] | 0;
						const parDiff = player.parDiff + handicap;
						console.log(player.playerName, player.gross, player.parDiff);
						if (parDiff <= -4) points = 6;
						else if (parDiff > 1) points = 0;
						else {
							points = 2 - parDiff;
						}
					}
					scores.push(points);
					this.update(f, holeScore.holeNo, points)
				}
			}
		});
		console.log('Stableford before updateResult', scores);
		this.updateResult(holeScore.holeNo, scores);
	}
}