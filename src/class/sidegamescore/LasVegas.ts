import { sideGame } from "src/database/db.interface";
import { holesPlayerScore } from "../class.if";
import Hessein from "./Hessein";
import { AnyObject } from "src/models/if";
import LasVegasScoreCombine from "../common/LasVegasScoreCombine";

/**
 * 拉斯維加斯 (Las Vegas)
這是4人遊戲。第1洞開球出去後，依遠近分出1,2,3,4名，弟1洞的組合就是1和4同組，2和3同組。
有別於計算個人桿數，得分以同組兩人桿數的組合，桿數少的排前面(十位)，桿數多的排後面(個位)，來計算分數。
例如是PAR4的洞，1(A先生)打5桿，2(B)打6桿，3(C)打4桿，4(D)打4桿。1,4那組得分45，2,3那組得分46。得分少的為贏。
表示1,4那組各贏1點，2,3那組各輸1點。下1洞的組合，將會因本洞的桿數有所變動，以成績好的往後排。
桿數相同時，依上1洞的優先序。所以第2洞的組合排序C.D.A.B，變成C和B同一組，D和A同一組。
當有桿數10桿或以上時，桿數多的排前面，例如1個打11桿，1個打4桿，得分為114。
另，當有小鳥或更好成績出現時，對方要翻牌，即，桿數多的排前面。
 */
export default class LasVegas extends Hessein {
	private partDiff:number[] = [];
	constructor(sg:sideGame) {
		super(sg);
		this.forAffectTheNextGame = true;
	}
	calc(holeScore: holesPlayerScore): void {
		console.log('LasVegas calc', holeScore);
		this.partDiff = holeScore.scores.map((score) => score.parDiff);
		super.calc(holeScore);
	}
	protected ByBetterGame(score: number[]): number[] {
		//const isplayed = this.sg.extraInfo.isplayed as boolean[]
		return this.lvCal(score);
	}
	protected ByIndividual(score: number[], isplayed?: boolean[]): number[] {
		return this.lvCal(score);
	}
	private lvCal(score:number[]) {
		const curOrder = this.sg.extraInfo.Orders[`H${this.curHoleNo}`] as number[];
		const lvsc = new LasVegasScoreCombine(score, this.partDiff, curOrder);
		const newa = lvsc.calc();
		this.sg.extraInfo.Orders[`H${this.curHoleNo + 1}`] = lvsc.newOrders();
		return newa;
		/*
		console.log('lvCal', curOrder);
		const odrIdx1 = this.orderValueIndex(curOrder, 1);
		const odrIdx2 = this.orderValueIndex(curOrder, 2);
		const odrIdx3 = this.orderValueIndex(curOrder, 3);
		const odrIdx4 = this.orderValueIndex(curOrder, 4);
		const diff = (this.combineNumber(score, odrIdx1, odrIdx4) - this.combineNumber(score, odrIdx2, odrIdx3));
		this.resignPlace(score, curOrder);
		const tmp = [0,0,0,0];
		tmp[odrIdx1] = diff;
		tmp[odrIdx4] = diff;
		tmp[odrIdx2] = diff * -1;
		tmp[odrIdx3] = diff * -1;
		return tmp;
		*/
	}
	private combineNumber(score:number[], pos1:number, pos2:number) {
		let unitsDigit = 0, tensDigit = 0;
		const a = score[pos1];
		const b = score[pos2];
		console.log(a, b, pos1, pos2);
		if (a > b) {
			if (a > 9) {
				tensDigit = a;
				unitsDigit = b;
			} else {
				if (this.partDiff[pos1] < 0 || this.partDiff[pos2] < 0) {
					tensDigit = a;
					unitsDigit = b;					
				} else {
					tensDigit = b;
					unitsDigit = a;
				}
			}
		} else {
			if (b > 9) {
				tensDigit = b;
				unitsDigit = a;
			} else {
				if (this.partDiff[pos1] < 0 || this.partDiff[pos2] < 0) {
					tensDigit = b;
					unitsDigit = a;
				} else {
					tensDigit = a;
					unitsDigit = b;
				}
			}
		}
		console.log('combineNumber', parseInt( `${tensDigit}${unitsDigit}`, 10), tensDigit, unitsDigit);
		return parseInt( `${tensDigit}${unitsDigit}`, 10);
	}
	private resignPlace(score:number[], curOrder:number[]) {
		const tmps:AnyObject[] = score.map((v, idx) => {
			return { score: v, index: idx, order: curOrder[idx] }
		});
		tmps.sort((a, b) => { 
			let aNum = a.score;
			let bNum = b.score;
			//if (a.order > b.order) aNum += 1;
			//else bNum += 1;
			return aNum - bNum;
		});
		const tmpOrder:number[] = [];
		tmps.forEach((itm, idx) => {
			tmpOrder[itm.index] = idx+1;
		});
		console.log('resignPlace', score, curOrder, tmpOrder);
		console.dir(tmps);
		this.sg.extraInfo.Orders[`H${this.curHoleNo + 1}`] =  tmpOrder;
	}
	private orderValueIndex(order:number[], orderValue:number) {
		return order.findIndex((odr) => odr === orderValue);
	}
}
