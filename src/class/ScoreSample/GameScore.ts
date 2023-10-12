import { scoreLine, scoresData } from "../../function/func.interface";

export default class GameScore {
	private data:scoresData;
	private rgl = new RegExp('player[0-9]');
	constructor(gameid = '' ) {
		this.data = {
			gameid,
			front:[],
			back:[],
			total:[],
		}
	}
	assignData(dta:string[]){
		let title= dta[0];
		if (dta[0]==='hcp') title='HDCP';
		if (dta[0]==='par') title='PAR';
		for(let i=4; i<22; i++) {
			this.assignLine(title, i-3, dta[i]);
		}
	}
	private assignLine(title:string, holeNo:number, val:string) {
		if (title.match(this.rgl)) this.addTotal(title, holeNo, val);
		if (holeNo < 10) {
			this.assignLineData(this.data.front, title, holeNo, val);
		} else {
			this.assignLineData(this.data.back, title, holeNo - 9, val);
		}
	}
	private assignLineData(arr:scoreLine[], key:string, idx:number, value:string){
		const f = arr.find((itm) => itm.f0 === key);
		if (f) {
			f[`f${idx}`] = value;
		} else {
			const tmp = this.createLineData(key);
			tmp[`f${idx}`] = value;
			arr.push(tmp);
		}
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
	private addTotal(player:string, holeNo:number, value:string){
		let f = this.data.total.find((itm) => itm.f0 === player);
		if (!f) {
			f = this.createLineData(player);
			this.data.total.push(f);
		}
		let fairwayno = holeNo;
		const f3 = parseInt(f.f3, 10);
		const f4 = parseInt(f.f4, 10);
		let par = 0;
		let diff = 0;
		const val = parseInt(value, 10);
		if (holeNo < 10) {
			const f1 = parseInt(f.f1, 10);
			const pars = this.data.front.find((itm) => itm.f0 === 'PAR');
			par = parseInt(pars[`f${fairwayno}`], 10);
			f.f1 = `${ f1 + val }`;
		} else {
			fairwayno = holeNo - 9;
			const f2 = parseInt(f.f2, 10);
			const pars = this.data.back.find((itm) => itm.f0 === 'PAR');
			par = parseInt(pars[`f${fairwayno}`], 10);
			f.f2 = `${f2 + val }`;
		}
		diff = val - par;
		f.f3 = `${ f3 + val }`;
		let tdiff = f4 + diff;
		f.f4 = `${tdiff> 0 ? '+' : ''}${ tdiff }`;
	}
	showData() {
		console.log(this.data);
	}	
}