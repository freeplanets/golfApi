import { sideGame } from "../../database/db.interface";
import { holesPlayerScore } from "../class.if";
import StrokePlay from "./StrokePlay";

/**
 * 逐洞賽 (Skin)
通常在三球或四球時打球，每個洞都值一個“點數”。 該點數通常有個約定價值。 
如果玩家在第一洞完全獲勝，他們將獲得點數。 如果沒有人完全獲勝，則點數累計至下一洞，即，下一個洞值兩點。 
這一直持續到有人完全贏得一個洞。 當這種情況發生時，下一個洞將再次值一個”點數”。
可以根據球員差點之間的差異，依讓分規則計算。
 */
export default class Skin extends StrokePlay {  //ASideGameScore {
	private curHoleNo = 0;
	constructor(sg:sideGame){
		super(sg);
	}
	protected updateResult(holeNo: number, scores: number[]): void {
		console.log('skin update Result', holeNo, scores);
		this.curHoleNo = holeNo;
		super.updateResult(holeNo, scores);
	}
	protected ByIndividual(score: number[], isplayed: boolean[]): number[] {
		const newScore = score.map((v,idx) => isplayed[idx] ? v : 0);
		const players = isplayed.filter((p) => p).length;  // 參加人數
		const totalScore = players - 1; // 每同分數 ＝ 參加人數 - 1
		const newa = [ 0, 0, 0, 0];
		const min = Math.min(...newScore);
		const cnt = score.filter((v)=> v == min);
		console.log('ByIndividual min check', min, cnt, this.sg.carryOver);
		if (cnt.length === 1) {
			const carry = this.sg.carryOver ? this.sg.extraInfo.carry[`C${this.curHoleNo}`] : 0;
			console.log('ByIndividual carry', this.sg.sideGameName, this.curHoleNo, carry);
			score.forEach((v,idx) => {
				if (v == min) {
					newa[idx] = totalScore + carry * totalScore;
				} else {
					newa[idx] = -1 - carry;
				}
			})
 		} else {
			if (this.sg.carryOver) {
				const tmpCarry = this.sg.extraInfo.carry[`C${this.curHoleNo}`];
				const curCarry = tmpCarry ? tmpCarry : 0;
				this.sg.extraInfo.carry[`C${this.curHoleNo+1}`] += 1 + curCarry;
				console.log('ByIndividual add carry', this.sg.sideGameName, this.sg.extraInfo.carry[`C${this.curHoleNo+1}`]);
			}
		}
		return newa;		
	}
	protected ByBetterGame(score: number[]): number[] {
		const group:string[] = this.sg.extraInfo.group;
		const groups = this.betterGroup(group, score);
		const carry = this.sg.carryOver ? this.sg.extraInfo.carry[`C${this.curHoleNo}`] : 1;
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
			if (this.sg.carryOver) {
				const tmpCarry = this.sg.extraInfo.carry[`C${this.curHoleNo}`];
				const curCarry = tmpCarry ? tmpCarry : 0;
				this.sg.extraInfo.carry[`C${this.curHoleNo+1}`] += 1 + curCarry;
			}
			return [0, 0, 0, 0];
		} else {
			let winTeam = '';
			if (g1.betterScore > g2.betterScore) {
				winTeam = g2.name;
			} else {
				winTeam = g1.name;
			}
			return group.map((g) => g === winTeam ? 1 + carry : -1 - carry);
		}
	}
}