import { holesPlayerScore } from "../class.if";
import ASideGameScore from "./ASideGameScore";

/**
 * 改良史特伯福分數(Modified Stableford)
除了計分規則不同外，其餘跟史特伯福分數規則完全一樣。計分如下：
8分—低於三桿
5分—低於兩桿
2分—低於一桿
0分—平標準桿
-1分—超過一桿
-3分—超過兩桿或更多
 */
export default class ModifiedStableford extends ASideGameScore {
	calc(holeScore: holesPlayerScore): void {
		const scores:number[] = [];
		holeScore.scores.forEach((player)=>{
			if (player.gross>0) {
				const f = this.sg.playerGameData.find((itm) => itm.playerName === player.playerName);
				if (f) {
					let points = 0;
					if (f.selected) {
						const handicap = f.extraInfo.hcp[holeScore.holeNo-1] | 0;
						const parDiff = player.parDiff - handicap;
						if (parDiff <= -3) points = 8;
						 //else if (parDiff > 1) f.points = -3;
						else {
							switch(parDiff) {
								case -2:
									points = 5;
									break;
								case -1:
									points = 2;
									break;
								case 0:
									points = 0;
									break;
								case 1:
									points = -1;
									break;
								default: // > 1
									points = -3;
							}
						}
						// f.points = (this.sg.wager | 1) * points;
						points *= (this.sg.wager | 1);	
					}
					scores.push(points);
					this.update(f, holeScore.holeNo, points);
				}
			}
		});
		this.updateResult(holeScore.holeNo, scores);
	}	
}