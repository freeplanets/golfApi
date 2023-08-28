import { scoreLine } from "../../function/func.interface";
import { playerGameData, sideGame } from "../../database/db.interface";
import { holesPlayerScore } from "../class.if";

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
		const total:scoreLine = this.newline(this.sg.sideGameName);
		const iTotal = { f1:0, f2:0, f3:0, f4:0 };
		const scoreLines:scoreLine[] = []
		for(let i=0; i< 18; i+=1) {
			scoreLines.push(this.newline(`${i+1}`));
		}
		this.sg.playerGameData.forEach((player, idx) => {
			title[`f${idx}`] = player.playerName;
			player.holes.forEach((score) => {
				scoreLines[score.holeNo-1][`f${idx}`]=score.gross ? `${score.gross}` : '';
				iTotal[`f${idx}`] +=  score.gross;
			});
		});
		Object.keys(iTotal).forEach((key) => {
			total[key] = iTotal[key] ? `${iTotal[key]}` : '';
		});
		return { title, total, scoreLines };
	}
	protected newline(f0='') {
		return { f0, f1:'', f2:'', f3:'',	f4:''	}
	}
}