
export default class teamWinnerGetPoint {
	private teamX:number[] = [];
	private teamY:number[] = [];
	// groups 兩人一組
	private scoreX:number[] = [];
	private scoreY:number[] = [];
	calc(scores:number[], groups:string[]){
		this.makeGroups(groups, scores);
		const scoreX = this.betterScore(this.scoreX);
		const scoreY = this.betterScore(this.scoreY);
		const newa = [0, 0, 0, 0];
		// default scoreX < scoreY 
		let pointX = 1;
		let pointY = -1;
		if (scoreX === scoreY) return newa;
		if (scoreX > scoreY) {
			pointX = -1;
			pointY = 1;	
		}
		this.teamX.forEach((idx) => {
			newa[idx] = pointX;
		});
		this.teamY.forEach((idx) => {
			newa[idx] = pointY;
		});
		return newa;
	}
	private makeGroups(groups:string[], scores:number[]) {
		let teamMarkX = '';
		groups.forEach((v, idx) => {
			if (this.teamX.length === 0){
				teamMarkX = v;
				this.teamX.push(idx);
			} else {
				if (v === teamMarkX) {
					this.teamX.push(idx);
				} else {
					this.teamY.push(idx);
				}
			}
		});
		console.log('group check', this.teamX, this.teamY, groups);
		this.scoreX = this.teamX.map((v) => scores[v]);
		this.scoreY = this.teamY.map((v) => scores[v]);
	}
	private betterScore(scores:number[]):number {
		return Math.min(...scores);
	}
}