import { sideGameFormat, sideGameGroup, sideGames } from "../../models/enum";
import { scoreLine } from "../../function/func.interface";
import { iScoreLine } from "../class.if";
import StrokePlay from "./StrokePlay";
import { sideGame } from "../../database/db.interface";
import winnerGetPoint from "../common/winnerGetPoint";
import teamWinnerGetPoint from "../common/teamWinnerGetPoint";

interface playerScoreLine {
	f1?:number;
	f2?:number;
	f3?:number;
	f4?:number;
	f5?:number;
	f6?:number;
	f7?:number;
	f8?:number;
	f9?:number;
	f10?:number;
	f11?:number;
	f12?:number;
	f13?:number;
	f14?:number;
	f15?:number;
	f16?:number;
	f17?:number;
	f18?:number;
	f19?:number;
}
export interface tmpScore {
	playerName:string;
	subTotal:iScoreLine;
	scoreLine: playerScoreLine;
}
/**
 * 拿騷(Nassau 2-2-2)
Nassau本質上是三個獨立的投注。 投注前九洞（第 1-9 洞）、後九洞（第 10-18 洞）和總共 18 個洞的最佳桿數。
可以根據球員差點之間的差異，依讓分規則計算。
 */
export default class Nassau extends StrokePlay {
	constructor(sg:sideGame) {
		super(sg);
		if (!this.sg.extraInfo.subTotal) {
			this.sg.extraInfo.subTotal = this.sg.playerGameData.map((pg) => {
				return {
					playerName: pg.playerName,
					subTotal: this.rline.newILine(0,0,0,0,0),
					scoreLine: {},
				}
			});
		}
	}
	protected updateResult(holeNo: number, scores: number[]): void {
		if (scores.length < 4) return;
		let fIdx = 0;
		if (holeNo <= 9) {
			fIdx = 1;
		} else {
			fIdx = 2;
		}
		this.updateResultCal(fIdx, holeNo, scores);
	}
	protected updateResultCal(fIdx:number, holeNo: number, scores: number[]) {
		const subTotal = this.sg.extraInfo.subTotal as tmpScore[];
		console.log('updateResultCal', fIdx, scores);
		let subF = [0, 0, 0, 0]; //前九	,sixs 前6
		let subB = [0, 0, 0, 0]; //後九	,sixs 中6
		let subT = [0, 0, 0, 0]; //前後合 ,sixs 後6 
		const isplayed = this.sg.extraInfo.isplayed as boolean[];
		subTotal.forEach((st, idx) => {
			if (!st.scoreLine[`f${holeNo}`]) st.scoreLine[`f${holeNo}`] = 0;
			const diff = scores[idx] - st.scoreLine[`f${holeNo}`];
			console.log('subTotal check', idx, ' > ', diff, scores[idx], st.scoreLine[`f${holeNo}`]);
			st.scoreLine[`f${holeNo}`] = scores[idx];
			if (!st.subTotal[`f${fIdx}`]) st.subTotal[`f${fIdx}`] = 0;
			st.subTotal[`f${fIdx}`] += diff;
			if (this.sg.sideGameName === sideGames.NASSAU) st.subTotal.f3 += diff;
			subF[idx] = st.subTotal.f1;
			subB[idx] = st.subTotal.f2;
			subT[idx] = st.subTotal.f3;
		})
		console.log(subF, subB, subT);
		if (this.sg.format === sideGameFormat.individual) {
			const winner = new winnerGetPoint();
			subF = winner.calc(subF, isplayed);
			subB = winner.calc(subB, isplayed);
			subT = winner.calc(subT, isplayed);
		} else {
			let group:string[] | string[][];
			group = this.sg.extraInfo.group;
			let group1:string[];
			let group2:string[];
			let group3:string[];
			if (this.sg.sideGameName === sideGames.SIXES) {
				group1 = group[0] as string[];
				group2 = group[1] as string[];
				group3 = group[2] as string[];
			} else {
				group1 = group as string[];
				group2 = group as string[];
				group3 = group as string[];
			}
			const teamWinner = new teamWinnerGetPoint();
			console.log('updateResultCal group', holeNo, group);
			subF = teamWinner.calc(subF, group1);
			subB = teamWinner.calc(subB, group2);
			subT = teamWinner.calc(subT, group3);
		}
		const wager = this.sg.wager; 
		subF = subF.map((v) => v * wager);
		subB = subB.map((v) => v * wager);
		subT = subT.map((v) => v * wager);
		const gameDetail = this.sg.extraInfo.gameDetail as scoreLine[];
		const total = this.sg.extraInfo.total as scoreLine;
		gameDetail.forEach((gd,idx) => {
			if (isplayed[idx]) {
				gd.f1 = String(subF[idx]);
				gd.f2 = String(subB[idx]);
				gd.f3 = String(subT[idx]);
				gd.f4 = String(subF[idx] + subB[idx] + subT[idx]);
				total[`f${idx+1}`] = gd.f4;
			}
		})
		this.sg.extraInfo.total = total;
		this.sg.extraInfo.gameDetail = gameDetail;
		// console.log(total, gameDetail)
	}
}