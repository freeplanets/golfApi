import { scoreLine } from "src/function/func.interface";
import { sideGame } from "../../database/db.interface";
import { holesPlayerScore } from "../class.if";
import StrokePlay from "./StrokePlay";
import { iGroup } from "./ASideGameScore";

/**
 * 逐洞賽 (Skin)
通常在三球或四球時打球，每個洞都值一個“點數”。 該點數通常有個約定價值。 
如果玩家在第一洞完全獲勝，他們將獲得點數。 如果沒有人完全獲勝，則點數累計至下一洞，即，下一個洞值兩點。 
這一直持續到有人完全贏得一個洞。 當這種情況發生時，下一個洞將再次值一個”點數”。
可以根據球員差點之間的差異，依讓分規則計算。
 */
export default class Skin extends StrokePlay {  //ASideGameScore {
	protected carry:boolean;
	constructor(sg:sideGame){
		super(sg);
		this.carry = true;
		if (this.carry) {
			this.sg.extraInfo.carry = 0;
		}
	}
	protected ByIndividual(score: number[], isplayed: boolean[]): number[] {
		const newScore = score.map((v,idx) => isplayed[idx] ? v : 0);
		const players = isplayed.filter((p) => p).length;  // 參加人數
		const totalScore = players - 1; // 每同分數 ＝ 參加人數 - 1
		const newa = [ 0, 0, 0, 0];
		const min = Math.min(...newScore);
		const cnt = score.filter((v)=> v == min);
		if (cnt.length === 1) {
			const base = 1 + this.sg.extraInfo.carry;
			this.sg.extraInfo.carry = 0;
			score.forEach((v,idx) => {
				if (v == min) {
					newa[idx] = totalScore * base;
				} else {
					newa[idx] = -1 * base;
				}
			})
 		} else {
			if (this.carry) {
				this.sg.extraInfo.carry += 1;
			}
		}
		return newa;		
	}
	protected ByBetterGame(score: number[]): number[] {
		const group:string[] = this.sg.extraInfo.group;
		const groups = this.betterGroup(group, score);
		// 檢查分組最佳成績
		group.forEach((g,idx) => {
			let f = groups.find((itm) => itm.name === g);
			if (!f) {
				if (groups[0].name === '') {
					f = groups[0];
				} else {
					f = groups[1];
				}
				f.name = g;
			}
			if (f.betterScore > score[idx]) f.betterScore = score[idx]; 
		});
		const g1 = groups[0];
		const g2 = groups[1];
		if (g1.betterScore = g2.betterScore) {
			if (this.carry) {
				this.sg.extraInfo.carry += 1;
			}
			return [0, 0, 0, 0];
		} else {
			let winTeam = '';
			if (g1.betterScore > g2.betterScore) {
				winTeam = g2.name;
			} else {
				winTeam = g1.name;
			}
			return group.map((g) => g === winTeam ? 1 : -1);
		}
		
		// 比對各組成績及結果

	}
	/*
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
					tmpScore.parDiff = player.parDiff + handicap;
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
	*/
}