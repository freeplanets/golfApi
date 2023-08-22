import { sideGame } from "../../database/db.interface";
import { holesPlayerScore } from "../class.if";
import ASideGameScore from "./ASideGameScore";

/**
 * 逐洞賽 (Skin)
通常在三球或四球時打球，每個洞都值一個“點數”。 該點數通常有個約定價值。 如果玩家在第一洞完全獲勝，他們將獲得點數。 如果沒有人完全獲勝，則點數累計至下一洞，即，下一個洞值兩點。 這一直持續到有人完全贏得一個洞。 當這種情況發生時，下一個洞將再次值一個”點數”。
可以根據球員差點之間的差異，依讓分規則計算。
 */
export default class Skin extends ASideGameScore {
	protected carry:boolean;
	constructor(sg:sideGame){
		super(sg);
		this.carry = sg.carryOver ? true : false;
	}
	calc(holeScore: holesPlayerScore): void {
		const tmp:holesPlayerScore = {
			holeNo:holeScore.holeNo,
			scores: [],
		}
		tmp.scores = holeScore.scores.map((player)=>{
			const tmpScore = { ...player }
			if (tmpScore.gross>0) {
				const f = this.sg.playerGameData.find((itm) => itm.playerName === player.playerName);
				if (f) {
					const handicap = f.extraInfo.hcp[holeScore.holeNo-1] | 0;
					tmpScore.parDiff = player.parDiff - handicap;
				}
			}
			return tmpScore;
		});
		tmp.scores.sort((a, b)=> b.parDiff - a.parDiff);
		if (tmp.scores[0].parDiff !== tmp.scores[0].parDiff) {
			const f = this.sg.playerGameData.find((itm) => itm.playerName === tmp.scores[0].playerName);
			if (f) {
				let points = this.sg.wager | 1;
				if (this.sg.extraInfo.carry) {
					if (this.sg.extraInfo.carry.holeNo === holeScore.holeNo) {
						points += this.sg.extraInfo.carry.points as number;
						delete this.sg.extraInfo.carry;
					}
				}
				this.update(f, holeScore.holeNo, points);
			}
		} else {
			if(this.carry) {
				this.sg.extraInfo.carry = {
					holeNo: holeScore.holeNo + 1 > 18 ? 1 : holeScore.holeNo + 1,
					points: this.sg.wager | 1, 
				}
			}
		}
	}
}