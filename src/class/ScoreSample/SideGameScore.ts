import { scoreLine } from "../../function/func.interface";
import { IScoreSample } from "../class.if";

/**
 * 
 * handicap run 記在 playerDefaults 新增小遊戲前先修改 
 */

interface ISGameScore {
	sideGameName: string,
	detail: scoreLine[],	
}

export default class SideGameScore implements IScoreSample {
	// private sName:string;
	private data:ISGameScore = {
		sideGameName: '',
		detail: [],
	}
	public gameForm:any;
	constructor(dta:string[]){
		this.data.sideGameName = dta[0];
		this.gameForm = this.sideGameForm(dta[0], dta[2]);
	}
	get hasData(): boolean {
		return this.data.detail.length !== 0;
	}
	assignData(dta: string[]): void {
		// const f = this.data.detail.find((itm) => itm.f0 === dta[0]);
		if (dta[4] === '' || dta[4] === '1-6') return;
		let end = 22;
		let ft = 19;
		if (dta[7] ==='') {
			end = 7;
			ft = 4
		}
		const newLine = this.createLineData(dta[0]);
		this.gameForm.playerGameData.push(this.playerGameData(dta[0], dta[1]));
		let total = 0;
		for(let i=4; i<end; i++) {
			newLine[`f${i-3}`] = dta[i];
			total += parseInt(dta[i], 10);
			// this.assignLine(title, i-3, dta[i]);
		}
		newLine[`f${ft}`] = String(total);
		this.data.detail.push(newLine);
	}
	getData() {
		return this.data;
	}
	private createLineData(player:string) {
		const tmp:scoreLine = {
			f0: player,
			f1: '0',
			f2: '0',
			f3: '0',
			f4: '0',
		}
		return tmp;
	}
	private sideGameForm(sideGameName:string, format:string) {
		return {
			_action:"new",wager:1,
			sideGameName:`${sideGameName}`,format:`${format}`,hcpType:"",
			playerGameData:[],
		}
	}
	private playerGameData(player:string, hcp:string, group='') {
		return {hcpRound:false,hcp:`${hcp}`,playerName:`${player}`,allowance:100,betterballGroup:`${group}`,selected:true,playOrder:"",tee:"white"};
	}
}