export default class LasVegasScoreCombine {
	private tOne = [1, 4];  // play order 1, 4
	// private tTwo = [2, 3];	// play order 2, 3
	private teamOne:number[] = [];
	private teamTwo:number[] = [];
	private idxOne:number[] = [];
	private idxTwo:number[] = [];
	private numOne = 0;
	private numTwo = 0;
	// private stopOne = false;
	private stopTwo = false;
	constructor(private scores:number[], private parDiff:number[], private curOrder:number[]) {
		this.regroup();
		this.checkOne();
		this.checkTwo();
	}
	calc():number[] {
		const newa = [0, 0, 0, 0];
		let points = 0;
		if (this.numTwo !== this.numOne) {
			//points = this.numTwo > this.numOne ? 1 : -1;
			points = this.numTwo - this.numOne;
			console.log('LasVegas', points, this.numTwo, this.numOne);
		}
		this.idxOne.forEach((idx) => {
			newa[idx] = points;
		});
		this.idxTwo.forEach((idx) => {
			newa[idx] = points * -1;
		});
		return newa;
	}
	newOrders() {
		const tmp = this.scores.map((score, index) => {
			return {
				score,
				index,
			}
		});
		tmp.sort((a, b) => a.score - b.score);
		console.log('newOrders', tmp);
		const orders = [0, 0, 0, 0];
		tmp.forEach((itm, idx) => {
			orders[itm.index] = idx+1
		});
		return orders;
	}
	private regroup() {
		this.curOrder.forEach((odr, idx) => {
			const f = this.tOne.find((t) => t === odr);
			if (f) {
				this.teamOne.push(this.scores[idx]);
				this.idxOne.push(idx);
			} else {
				this.teamTwo.push(this.scores[idx]);
				this.idxTwo.push(idx);
			}
		});
	}
	private checkOne() {
		if (this.idxOne.some((v) => this.parDiff[v] < 0)) { // 有好於birdie的成績，對手翻牌
			console.log('checkOne', this.parDiff , this.idxOne);
			this.numTwo = this.bigerFirst(this.teamTwo[0], this.teamTwo[1]);
			this.stopTwo = true;
		}
		if (this.teamOne.some((v) => v > 9)) this.numOne = this.bigerFirst(this.teamOne[0], this.teamOne[1]);
		else this.numOne = this.smallFirst(this.teamOne[0], this.teamOne[1]);
	}
	private checkTwo() {
		if (this.stopTwo) return;
		if (this.idxTwo.some((v) => this.parDiff[v] < 0)) { // 有好於birdie的成績，對手翻牌
			this.numOne = this.bigerFirst(this.teamOne[0], this.teamOne[1]);
		}
		if (this.teamTwo.some((v) => v > 9)) this.numTwo = this.bigerFirst(this.teamTwo[0], this.teamTwo[1]);
		else this.numTwo = this.smallFirst(this.teamTwo[0], this.teamTwo[1]);
	}
	private bigerFirst(a:number, b:number) {
		let tmp=`${a}${b}`;
		if (a < b) tmp = `${b}${a}`;
		console.log('bigerFirst', tmp, a, b);
		return parseInt(tmp, 10);
	}
	private smallFirst(a:number, b:number) {
		let tmp=`${a}${b}`;
		if (a > b) tmp = `${b}${a}`;
		console.log('smallFirst', tmp, a, b);
		return parseInt(tmp, 10);
	}
}