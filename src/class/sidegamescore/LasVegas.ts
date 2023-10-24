import { sideGame } from "src/database/db.interface";
import { holesPlayerScore } from "../class.if";
import Hessein from "./Hessein";
import { AnyObject } from "src/models/if";
import LasVegasScoreCombine from "../common/LasVegasScoreCombine";
import { sideGameFormat } from "../../models/enum";

/**
 * 拉斯維加斯 (Las Vegas)
基本上會是同組的四個人一起玩，第一洞開球出去後，依照遠近分別出1.2.3.4名，這時第一洞的組合就是1和4是同一組，2和3是同一組。
如果是PAR4的洞，1（A先生）打5桿，2（B）打6桿，3（C）打4桿，4（D）打4桿，1.4那組就是45（桿數少的擺前面），2.3那組就是46。
45-46=1，1.4那組就是各贏1點，2.3那組就是各輸1點。
到下一洞時組合將會因為上一洞桿數有所變動。
由成績最好的往後排，所以第二洞的組合便是第一洞的C.D.A.B，所以變成C和B是同組，D跟A是同組，然後以同樣的方式計算點數的輸贏。
這樣一直打完18洞後把每洞每個人的輸贏點數加減出來就是輸贏了。
當有一組有人打出低於標準桿時，還規定要翻牌。
意思就是輸的那方要反過來把成績較差的擺在前面，也就是本來是46要變成64，這時點數就有可能會有幾十點的差別。
 */
export default class LasVegas extends Hessein {
	private partDiff:number[] = [];
	constructor(sg:sideGame) {
		super(sg);
		this.forAffectTheNextGame = true;
		this.sg.format = sideGameFormat.team;
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
		this.sg.extraInfo.Orders[`H${this.curHoleNo + 1}`] = lvsc.newOrders(curOrder);
		console.log('LasVegas curOrder', this.curHoleNo, curOrder, this.sg.extraInfo.Orders);
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
			return bNum - aNum;
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
