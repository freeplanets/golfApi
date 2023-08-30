import { scoreLine } from "../../function/func.interface";
import { playerGameData, sideGame } from "../../database/db.interface";
import { holesPlayerScore, iScoreLine } from "../class.if";
import { sideGameFormat } from "src/models/enum";

interface iGroup {
	name:string;
	betterScore:number;
	points:number;	
}

export default abstract class ASideGameScore {
	constructor(protected sg:sideGame){}
	abstract calc(holeScore:holesPlayerScore):void;
	protected update(pgd:playerGameData, holeNo:number, points:number){
		const f = pgd.holes.find((hole) => hole.holeNo === holeNo);
		if (f) {
			pgd.points -= f.gross;
			f.gross = points;
			pgd.points += f.gross;
		}
	}
	protected getResult() {
		const title:scoreLine = this.newline('HOLE');
		const iScoreLines: iScoreLine[] = [];
		const group:string[]=[];
		const isplayed:boolean[] =[];
		for(let i=0; i< 18; i+=1) {
			// scoreLines.push(this.newline(`${i+1}`));
			iScoreLines.push(this.newILine(i+1));
		}
		this.sg.playerGameData.forEach((player, idx) => {
			title[`f${idx+1}`] = player.playerName;
			group.push(player.betterballGroup);
			isplayed.push(player.selected);
			player.holes.forEach((score) => {
				//scoreLines[score.holeNo-1][`f${idx}`]=score.gross ? `${score.gross}` : '';
				iScoreLines[score.holeNo-1][`f${idx+1}`] = player.selected ? score.gross : 0;
				// iTotal[`f${idx}`] +=  score.gross;
			});
		});		
		if (this.sg.format === sideGameFormat.individual) {
			return this.ResultByIndividual(title, iScoreLines, isplayed);
		} else {
			return this.resultByBetterGame(group, title, iScoreLines);
		}
	}
	protected ResultByIndividual(title:scoreLine, scores:iScoreLine[], isplayed:boolean[]) {	
		const scoreLines:scoreLine[] = []
		let iT1=0, iT2=0, iT3=0, iT4=0;
		let t3Chk=false, t4Chk=false;
		scores.map((score) => {
				this.playerDiff(score, 1, isplayed);
				//iT1 += a1;
				//iT2 += a2;
				//iT3 += a3;
				//iT4 += a4;
			// return this.newline(String(score.f0), String(a1), String(a2), String(a3), String(a4));
		})
		const total = this.newline(this.sg.sideGameName, String(iT1), String(iT2), String(iT3), String(iT4));
		return { title, total, scoreLines };
	}
	protected resultByBetterGame(group:string[], title:scoreLine, scores:iScoreLine[]) {
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
		const scoreLines = scores.map((score) => {
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
			return this.newline(String(score.f0),String(score.f1),String(score.f2),String(score.f3),String(score.f4));
		});
		const total = this.newline(this.sg.sideGameName, String(iT1), String(iT2), String(iT3), String(iT4));
		return { title, total, scoreLines }; 
	}
	protected newline(f0='', f1='', f2='', f3='', f4=''):scoreLine {
		return { f0, f1, f2, f3, f4 };
	}
	protected newILine(f0=-1, f1=0,f2=0, f3=0, f4=0):iScoreLine {
		return { f0, f1, f2, f3, f4 };
	}
	protected playerDiff(score:iScoreLine, pos:number, isplayed:boolean[]) {
		switch(pos) {
			case 1:
				// return this.scoreDiff(score.f1, score.f2, score.f3, score.f4);
			case 2:
				// return this.scoreDiff(score.f2, score.f1, score.f3, score.f4);
			case 3:
				// return this.scoreDiff(score.f3, score.f2, score.f1, score.f4);
			case 4:
				// return this.scoreDiff(score.f4, score.f3, score.f2, score.f1);
		}
	}
	protected scoreDiff(sl:iScoreLine,pos:number, isplayed:boolean[]) {

	}
}