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
}