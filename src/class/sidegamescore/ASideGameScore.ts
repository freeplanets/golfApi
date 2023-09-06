import { scoreLine } from "../../function/func.interface";
import { playerGameData, sideGame } from "../../database/db.interface";
import { holesPlayerScore, iScoreLine } from "../class.if";
import { sideGameFormat } from "../../models/enum";

interface iGroup {
	name:string;
	betterScore:number;
	points:number;	
}

export default abstract class ASideGameScore {
	constructor(protected sg:sideGame){}
	get name() {
		return this.sg.sideGameName;
	}
	abstract calc(holeScore:holesPlayerScore):void;
	protected update(pgd:playerGameData, holeNo:number, points:number){
		const f = pgd.holes.find((hole) => hole.holeNo === holeNo);
		//console.log(this.name, pgd.playerName, pgd.points);
		if (f) {
			if (pgd.points === undefined) pgd.points = 0;
			pgd.points -= f.gross;
			f.gross = points;
			pgd.points += f.gross;
		}
		this.getResult();
	}
	protected getResult() {
		// const title:scoreLine = this.newline('HOLE');
		const gameDetail:scoreLine[] = [];
		const iScoreLines: iScoreLine[] = [];
		const group:string[]=[];
		const isplayed:boolean[] =[];
		for(let i=0; i< 18; i+=1) {
			// scoreLines.push(this.newline(`${i+1}`));
			iScoreLines.push(this.newILine(i+1));
		}
		this.sg.playerGameData.forEach((player, idx) => {
			// title[`f${idx+1}`] = player.playerName;
			gameDetail.push(this.createGameDetail(player.playerName));
			group.push(player.betterballGroup);
			isplayed.push(player.selected);
			player.holes.forEach((score) => {
				//scoreLines[score.holeNo-1][`f${idx}`]=score.gross ? `${score.gross}` : '';
				if (!iScoreLines[score.holeNo-1]) iScoreLines[score.holeNo-1]= this.newILine(score.holeNo);
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
		const total = this.newline(this.sg.sideGameName, String(iT1), String(iT2), String(iT3), String(iT4), this.sg.sidegameid);
		// console.log('total:', total);
		if (!this.sg.extraInfo) this.sg.extraInfo = {}; 
		this.sg.extraInfo.total = total;
		this.sg.extraInfo.gameDetail = gameDetail;
	}
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
		const total = this.newline(this.sg.sideGameName, String(iT1), String(iT2), String(iT3), String(iT4), this.sg.sidegameid);
		this.sg.extraInfo.total = total;
		this.sg.extraInfo.gameDetail = gameDetail;
	}
	protected createGameDetail(f0='', f1='', f2='', f3='', f4='', f5='', f6='', f7='', f8='', f9='', f10=''
		, f11='', f12='', f13='', f14='', f15='', f16='', f17='', f18='', f19=''){
		return {f0, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19};
	}
	protected newline(f0='', f1='', f2='', f3='', f4='', f5= ''):scoreLine {
		const ans:scoreLine = { f0, f1, f2, f3, f4 };
		if (f5) ans.f5 = f5;
		return ans;
	}
	protected newILine(f0=-1, f1=0,f2=0, f3=0, f4=0):iScoreLine {
		return { f0, f1, f2, f3, f4 };
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
			total += s[i] - s[0];
		}
		// console.log('scoreDiff', total);
		return total;
	}
}