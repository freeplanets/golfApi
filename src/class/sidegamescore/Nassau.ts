import { sideGameFormat } from "src/models/enum";
import { scoreLine } from "../../function/func.interface";
import { holesPlayerScore, iScoreLine } from "../class.if";
import ASideGameScore from "./ASideGameScore";
import StrokePlay from "./StrokePlay";
import { score, sideGame } from "src/database/db.interface";

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
interface playerScore {
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
		const subTotal = this.sg.extraInfo.subTotal as playerScore[];
		let fIdx = 0;
		if (holeNo <= 9) {
			fIdx = 1;
		} else {
			fIdx = 2;
		}
		let subF = [0, 0, 0, 0]; //前九	
		let subB = [0, 0, 0, 0]; //後九
		let subT = [0, 0, 0, 0]; //前後合
		const isplayed = this.sg.extraInfo.isplayed as boolean[];
		subTotal.forEach((st, idx) => {
			if (st.subTotal[`f${holeNo}`] === undefined) st.subTotal[`f${holeNo}`] = 0;
			const diff = scores[idx] - st.subTotal[`f${holeNo}`];
			st.subTotal[`f${holeNo}`] = scores[idx];
			if (st.subTotal[`f${fIdx}`] === undefined) st.subTotal[`f${fIdx}`] = 0;
			st.subTotal[`f${fIdx}`] += diff;
			subF[idx] = st.scoreLine.f1;
			subB[idx] = st.scoreLine.f2;
			subT[idx] = st.scoreLine.f3;
		})
		if (this.sg.format === sideGameFormat.individual) {
			subF = this.ByIndividual(subF, isplayed);
			subB = this.ByIndividual(subB, isplayed);
			subT = this.ByIndividual(subT, isplayed);
		} else {
			subF = this.ByBetterGame(subF);
			subB = this.ByBetterGame(subB);
			subT = this.ByBetterGame(subT);
		}
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
	}
}