import { scoreLine } from "../../function/func.interface";
import { playerGameData, sideGame } from "../../database/db.interface";
import { holesPlayerScore, iScoreLine } from "../class.if";
import { sideGameFormat, sideGames } from "../../models/enum";
import recordLine from "../common/recordLine";
import stringScore from "../common/stringScore";
import { AnyObject } from "src/models/if";

export interface iGroup {
	name:string;
	betterScore:number;
	points:number;
}

export default abstract class ASideGameScore {
	protected rline = new recordLine();
	protected sc = new stringScore();
	protected forAffectTheNextGame = false;
	// protected CalcCounter = 0;
	protected highWin = false; // true 得分高者 Win, false 桿數低者 Win
	constructor(protected sg:sideGame){
		this.createResultData();
	}
	get name() {
		return this.sg.sideGameName;
	}
	abstract calc(holeScore:holesPlayerScore):void;
	protected update(pgd:playerGameData, holeNo:number, points:number){
		const f = pgd.holes.find((hole) => hole.holeNo === holeNo);
		if (f) {
			// console.log(pgd.playerName, pgd.points, f.gross, points);
			if (pgd.points === undefined || isNaN(pgd.points)) pgd.points = 0;
			if (f.gross === undefined || isNaN(f.gross)) f.gross = 0;
			pgd.points -= f.gross;
			f.gross = points;
			pgd.points += f.gross;
		}
	}
	protected createResultData(){
		console.log('createResultData', this.sg.sideGameName);
		if (!this.sg.extraInfo) this.sg.extraInfo = {};
		if (!this.sg.extraInfo.total) {
			this.sg.extraInfo.total = this.rline.newline(this.sg.sideGameName, '', '', '', '', this.sg.sidegameid);
			const gameDetail:scoreLine[] = [];
			const group:string[]=[];
			const isplayed:boolean[] =[];
			this.sg.playerGameData.forEach((pg) => {
				let tmp:scoreLine;
				if (this.sg.sideGameName === sideGames.NASSAU || this.sg.sideGameName === sideGames.SIXES) {
					tmp = this.rline.newline(pg.playerName);
				} else {
					tmp = this.rline.createGameDetail(pg.playerName);
				}
				gameDetail.push(tmp);
				if (pg.betterballGroup)	group.push(pg.betterballGroup);
				isplayed.push(pg.selected);
			});
			this.sg.extraInfo.gameDetail = gameDetail;
			this.sg.extraInfo.group = group;
			this.sg.extraInfo.isplayed = isplayed;
			if (this.sg.carryOver || this.sg.sideGameName === sideGames.HESSEIN) {
				this.sg.extraInfo.carry = this.createCarryOverData();
			}
		}
	}
	/*
	protected getResult() {
		// const title:scoreLine = this.newline('HOLE');
		const gameDetail:scoreLine[] = [];
		const iScoreLines: iScoreLine[] = [];
		const group:string[]=[];
		const isplayed:boolean[] =[];
		for(let i=0; i< 18; i+=1) {
			// scoreLines.push(this.newline(`${i+1}`));
			iScoreLines.push(this.rline.newILine(i+1));
		}
		this.sg.playerGameData.forEach((player, idx) => {
			// title[`f${idx+1}`] = player.playerName;
			gameDetail.push(this.rline.createGameDetail(player.playerName));
			group.push(player.betterballGroup);
			isplayed.push(player.selected);
			player.holes.forEach((score) => {
				//scoreLines[score.holeNo-1][`f${idx}`]=score.gross ? `${score.gross}` : '';
				if (!iScoreLines[score.holeNo-1]) iScoreLines[score.holeNo-1]= this.rline.newILine(score.holeNo);
				iScoreLines[score.holeNo-1][`f${idx+1}`] = player.selected ? score.gross : 0;
				// iTotal[`f${idx}`] +=  score.gross;
			});
		});		
		if (this.sg.format === sideGameFormat.individual) {
			this.ResultByIndividual(iScoreLines, gameDetail, isplayed);
		} else {
			this.resultByBetterGame(group, iScoreLines, gameDetail);
		}
	}
	*/
	protected updateResult(holeNo:number, scores:number[]){
		if (scores.length < 4) return;
		let newa:number[];
		const isplayed = this.sg.extraInfo.isplayed as boolean[];
		const wager = this.sg.wager ? this.sg.wager : 1;
		console.log('updateResult', this.sg.sideGameName, wager, this.sg.wager, scores);
		if (this.sg.format === sideGameFormat.individual) {
			newa = this.ByIndividual(scores, isplayed);
		} else {
			newa = this.ByBetterGame(scores);
		}
		console.log('updateResult 1', this.sg.sideGameName, newa);
		newa = newa.map((v) => v * wager); // 乘上每點分數
		console.log('updateResult 2', this.sg.sideGameName,newa);
		const gameDetail = this.sg.extraInfo.gameDetail as scoreLine[];
		const olda = gameDetail.map((v) =>  v[`f${holeNo}`] ? parseInt(v[`f${holeNo}`], 10) : 0);
		const tt = gameDetail.map((v) =>  v.f19 ? parseInt(v.f19, 10) : 0);
		const diff = newa.map((v, idx) => v - olda[idx]);
		const total = this.sg.extraInfo.total as scoreLine;
		diff.forEach((v, idx) =>{ 
			tt[idx] += v;
			gameDetail[idx][`f${holeNo}`] = isplayed[idx] ? String(newa[idx]) : '';
			gameDetail[idx][`f19`] = isplayed[idx] ? String(tt[idx]) : '';
			total[`f${idx+1}`] = gameDetail[idx][`f19`]; 
		});
		// console.log('updateResult', this.sg.sideGameName, JSON.stringify(total));
		// console.log('updateResult', this.sg.sideGameName, JSON.stringify(gameDetail));
		this.sg.extraInfo.total = total;
		this.sg.extraInfo.gameDetail = gameDetail;
	}
	protected ByIndividual(score:number[], isplayed:boolean[]) {
		console.log('ByIndividual', this.sg.sideGameName, score, isplayed);
		// const isplayed = this.sg.extraInfo.isplayed as boolean[];
		const newa = [
			this.plDiff(score, 1, isplayed),
			this.plDiff(score, 2, isplayed),
			this.plDiff(score, 3, isplayed),
			this.plDiff(score, 4, isplayed),
		];
		return newa;
	}
	protected betterGroup(group:string[], score:number[]) {
		console.log('group:', this.sg.sideGameName, group);
		const g1:iGroup = {
			name: '',
			betterScore:999,
			points: 0,
		}
		const g2:iGroup = {
			name: '',
			betterScore:999,
			points:0,
		}
		const groups = [g1, g2];
		// 檢查分組最佳成績
		group.forEach((g,idx) => {
			let f = groups.find((itm) => itm.name === g);
			if (!f) {
				if (groups[0].name === '') {
					f = groups[0];
				} else {
					f = groups[1];
				}
				f.name = g;
			}
			if (f.betterScore > score[idx]) f.betterScore = score[idx]; 
		});
		return groups;
	}
	protected ByBetterGame(score:number[]) {
		const group:string[] = this.sg.extraInfo.group;
		const groups = this.betterGroup(group, score);
		// 比對各組成績及結果
		if (groups[0].betterScore < groups[1].betterScore) {
			groups[0].points = (groups[1].betterScore - groups[0].betterScore);
			groups[1].points = groups[0].points * -1;  
		} else {
			groups[0].points = (groups[0].betterScore - groups[1].betterScore);
			groups[1].points = groups[0].points * -1;				
		}
		// 結果寫回各人成績
		console.log('groups:', groups);
		const newa = group.map((g) => {
			let f = groups.find((itm) => itm.name === g);
			console.log('ASideGameScore ByBetterGame:', f);
			return f.points;
		});
		return newa;
		/*
		const gameDetail = this.sg.extraInfo.gameDetail as scoreLine[];
		const total = this.sg.extraInfo.total as scoreLine;
		const olda = gameDetail.map((v) =>  v[`f${holeNo}`] ? parseInt(v[`f${holeNo}`], 10) : 0);
		const tt = gameDetail.map((v) =>  v.f19 ? parseInt(v.f19, 10) : 0);
		const diff = newa.map((v, idx) => v - olda[idx]);
		diff.forEach((v, idx) =>{ 
			tt[idx] += v;
			gameDetail[idx][`f${holeNo}`] = String(newa[idx]);
			gameDetail[idx][`f19`] = String(tt[idx]);
			total[`f${idx+1}`] = gameDetail[idx][`f19`]; 
		});
		this.sg.extraInfo.total = total;
		this.sg.extraInfo.gameDetail = gameDetail;
		*/
	}
	/*		
	protected ResultByIndividual(scores:iScoreLine[], gameDetail:scoreLine[], isplayed:boolean[]) {	
		let a1=0, a2=0, a3=0, a4=0;
		let iT1=0, iT2=0, iT3=0, iT4=0;
		scores.map((score) => {
				// this.playerDiff(score, 1, isplayed);
				a1 = this.playerDiff(score, 1, isplayed);
				a2 = this.playerDiff(score, 2, isplayed);	
				a3 = this.playerDiff(score, 3, isplayed);
				a4 = this.playerDiff(score, 4, isplayed);
				iT1 += a1;
				iT2 += a2;
				iT3 += a3;
				iT4 += a4;
				gameDetail[0][`f${score.f0}`] = a1 ? String(a1) : '';
				gameDetail[1][`f${score.f0}`] = a2 ? String(a2) : '';
				gameDetail[2][`f${score.f0}`] = a3 ? String(a3) : '';
				gameDetail[3][`f${score.f0}`] = a4 ? String(a4) : '';
		});
		gameDetail[0][`f19`] = iT1 ? String(iT1) : '';
		gameDetail[1][`f19`] = iT2 ? String(iT2) : '';
		gameDetail[2][`f19`] = iT3 ? String(iT3) : '';
		gameDetail[3][`f19`] = iT4 ? String(iT4) : '';
		const total = this.rline.newline(this.sg.sideGameName, String(iT1), String(iT2), String(iT3), String(iT4), this.sg.sidegameid);
		// console.log('total:', total);
		if (!this.sg.extraInfo) this.sg.extraInfo = {}; 
		this.sg.extraInfo.total = total;
		this.sg.extraInfo.gameDetail = gameDetail;
	}
	*/
	/*
	protected resultByBetterGame(group:string[], scores:iScoreLine[], gameDetail:scoreLine[]) {
		const g1:iGroup = {
			name: '',
			betterScore:999,
			points: 0,
		}
		const g2:iGroup = {
			name: '',
			betterScore:999,
			points:0,
		}
		const groups = [g1, g2];
		let iT1=0, iT2=0, iT3=0, iT4=0;
		scores.map((score) => {
			// 檢查分組最佳成績
			group.forEach((g,idx) => {
				let f = groups.find((itm) => itm.name === g);
				if (!f) {
					f = groups[0];
				}
				if (f.betterScore > score[`f${idx+1}`]) f.betterScore = score[`f${idx+1}`]; 
			});
			// 比對各組成績及結果
			if (groups[0].betterScore < groups[1].betterScore) {
				groups[0].points = (groups[1].betterScore - groups[0].betterScore) * this.sg.wager;
				groups[1].points = groups[0].points * -1;  
			} else {
				groups[0].points = (groups[0].betterScore - groups[1].betterScore) * this.sg.wager;
				groups[1].points = groups[0].points * -1;				
			}
			// 結果寫回各人成績
			group.forEach((g, idx) => {
				let f = groups.find((itm) => itm.name === g);
				score[`f${idx+1}`]=f.points;
			});
			iT1+= score.f1;
			iT2+= score.f2;
			iT3+= score.f3;
			iT4+= score.f4;
			gameDetail[0][`f${score.f0}`] = score.f1 ? String(score.f1) : '';
			gameDetail[1][`f${score.f0}`] = score.f2 ? String(score.f2) : '';
			gameDetail[2][`f${score.f0}`] = score.f3 ? String(score.f3) : '';
			gameDetail[3][`f${score.f0}`] = score.f4 ? String(score.f4) : '';
			// return this.newline(String(score.f0),String(score.f1),String(score.f2),String(score.f3),String(score.f4));
		});
		gameDetail[0][`f19`] = iT1 ? String(iT1) : '';
		gameDetail[1][`f19`] = iT2 ? String(iT2) : '';
		gameDetail[2][`f19`] = iT3 ? String(iT3) : '';
		gameDetail[3][`f19`] = iT4 ? String(iT4) : '';		
		const total = this.rline.newline(this.sg.sideGameName, String(iT1), String(iT2), String(iT3), String(iT4), this.sg.sidegameid);
		this.sg.extraInfo.total = total;
		this.sg.extraInfo.gameDetail = gameDetail;
	}
	*/
	protected plDiff(score:number[], pos:number, isplayed:boolean[]) {
		const iAt = pos - 1;
		if(isplayed[pos-1]) {
			const tmp:number[] = [score[iAt]];
			isplayed.forEach((iAmGamed, idx) => {
				if(idx !== iAt) {
					if (iAmGamed) tmp.push(score[idx]);
				}
			});
			return this.scoreDiff(tmp);
		} 
		return 0;
	}
	protected playerDiff(score:iScoreLine, pos:number, isplayed:boolean[]) {
		const iAt = pos - 1;
		if(isplayed[pos-1]) {
			const tmp:number[] = [score[`f${pos}`]];
			isplayed.forEach((iAmGamed, idx) => {
				if(idx !== iAt) {
					if (iAmGamed) tmp.push(score[`f${idx+1}`]);
				}
			});
			return this.scoreDiff(tmp);
		} 
		return 0;
	}
	protected scoreDiff(s:number[]) {
		// console.log('scoreDiff:', s);
		const count = s.length;
		if (count<2) return 0;
		let total = 0;
		for(let i = count-1; i>0; i--) {
			if (this.highWin) {
				total += s[0] - s[i];	
			} else {
				total += s[i] - s[0];
			}
		}
		// console.log('scoreDiff', total);
		return total;
	}
	private createCarryOverData() {
		const tmp:AnyObject = {}
		for(let i=1; i<19; i+=1 ) {
			tmp[`C${i}`] = 1;
		}
		return tmp;
	}
}