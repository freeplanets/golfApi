import { sideGame } from "src/database/db.interface";
import StrokePlay from "./StrokePlay";

/**
 * 打海珊(Hessein)
海珊賽法是同組球友在一洞開球時以第二順位的球友當「海珊」，
當海珊的人在該洞與其他球友比輸贏（例如，同組是三位，是一對二；同組是四位，則是一對三），
亦即，一洞結束後，海珊的桿數乘2（或乘3），與其他球友的桿數總合比較，
如海珊打了4桿，其他三位分別為4、4、5桿，則海珊是4乘3為12桿，其他三位的總合是13桿，海珊分別贏三位球友1點；
如海珊是5桿，其餘一樣是4、4、5桿，則是15桿對13桿，海珊要輸其他球友各2點。
賽程中，海珊的人選並非固定的，每一洞結束後，當洞擊球桿數排名第二（如桿數相同，則以開球順序為準）的球友自動成為下一洞的海珊。
假使在某洞平手且打球順序不變時，當「海珊」的球友延續擔任，但在下一洞的輸贏點數加倍；若再相同時，在下下一洞再加倍，餘依此類推。
 */
export default class Hessein extends StrokePlay {
	constructor(sg:sideGame){
		super(sg);
		if (!this.sg.extraInfo.curHessein) {
			const countBase=0;
			const curOrder = [];
			this.sg.extraInfo.playerPos = []; 
			this.sg.playerGameData.forEach((pg) => {
				let countBase = 0;
				this.sg.extraInfo.playerPos.push(pg.playerName);
				// if (pg.playOrder === 2) this.sg.extraInfo.curHessein = pg.playerName;
				if (pg.selected) countBase++;
				curOrder.push(pg.playOrder);
			});
			this.sg.extraInfo.countBase = countBase - 1;
			this.sg.extraInfo.carry = 1;
			this.sg.extraInfo.curOrder = curOrder;
		}
	}
	protected ByIndividual(score: number[], isplayed: boolean[]): number[] {
		return this.hessienCal(score, isplayed);		
	}
	protected ByBetterGame(score: number[]): number[] {
		const isplayed = this.sg.extraInfo.isplayed;
		return this.hessienCal(score, isplayed);
	}
	private hessienCal(score: number[], isplayed: boolean[]) {
		// let curHessein = this.sg.extraInfo.curHessein as string;
		const carry = this.sg.extraInfo.carry as number;
		const wager = this.sg.wager;
		const countBase = this.sg.extraInfo.countBase as number;
		const curOrder = this.sg.extraInfo.curOrder as number[];
		let hsScore = 0;
		let others = 0;
		let hsIdx = 0; // second place index;
		score.forEach((v, idx) => {
			if (curOrder[idx] === 2) {
				hsIdx = idx;
				hsScore = v * countBase;
			} else {
				if (isplayed[idx]) others += v;
			}
		});
		const diff = hsScore - others;
		if (diff === 0) {
			this.sg.extraInfo.carry = carry * 2;
			return [0, 0, 0, 0];
		} else {
			const otPoint = wager * diff * -1; 
			const tmp = score.map((v, idx) => isplayed[idx] ? otPoint : 0);
			tmp[hsIdx] = diff * wager * countBase;
			this.assignSecondPlace(score, isplayed);
			return tmp;
		}
	}
	protected assignSecondPlace(score:number[], isplayed:boolean[]) {
		const curOrder = this.sg.extraInfo.curOrder as number[];
		const tmp = score.map((v, idx) => {
			return {
				index:idx,
				score: v,
				isplayed: isplayed[idx],
				playOrder: curOrder[idx],
			}
		});
		tmp.sort((a, b) => a.score - b.score + ( !a.isplayed ? 99 : (a.score === b.score) && (a.playOrder > b.playOrder) ? 1 : 0));
		tmp.forEach((a, idx) => {
			curOrder[a.index] = idx + 1;
		});
		this.sg.extraInfo.curOrder = curOrder;
	}
}