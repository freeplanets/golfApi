export default class winnerGetPoint {
	// 4人成績
	// small to win
	private isplayed:boolean[] = [];
	calc(scores:number[], isplayed:boolean[]):number[] {
		this.isplayed = isplayed;
		return scores.map((v, idx) => this.posToOther(idx, v, scores));
	}
	private posToOther(pos:number, score:number, scores:number[]):number {
		if (!this.isplayed[pos]) return 0;
		return scores.map((s, idx) => idx === pos ? 0 : this.smallWin(idx, score, s)).reduce((a, b) => a + b);
	}
	private smallWin(idx:number, base:number, compared:number):number {
		if (!this.isplayed[idx]) return 0;
		if (base === compared) return 0;
		if (base < compared) return 1;
		return -1;
	}
}