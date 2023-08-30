import { scoreLine } from "src/function/func.interface";
import StrokePlay from "./StrokePlay";

/**
 * 六局比桿賽 Sixes
每6局更換分組。本質上是三個獨立的投注。 投注前6洞（第 1-6 洞）、中6洞（第 7-12 洞）及後6洞（第 13-18 洞）的最佳桿數。
可以根據球員差點之間的差異，依讓分規則計算。
 */
export default class Sixes extends StrokePlay {
	protected getResult(): { title: scoreLine; total: scoreLine; scoreLines: scoreLine[]; } {
		const title:scoreLine = this.newline('HOLE');
		const total:scoreLine = this.newline(this.sg.sideGameName);
		const scoreLines:scoreLine[] = [];
		const first6 = { f1:0, f2:0, f3:0, f4:0 };
		const mid6 = { f1:0, f2:0, f3:0, f4:0 };
		const last6 = { f1:0, f2:0, f3:0, f4:0 };
		this.sg.playerGameData.forEach((player, idx) => {
			title[`f${idx}`] = player.playerName;
			player.holes.forEach((score) => {
				scoreLines[score.holeNo-1][`f${idx}`]=`${score.gross}`;
				if (score.holeNo < 7) {
					first6[`f${idx}`] +=  score.gross;
				} else {
					if (score.holeNo < 13) {
						mid6[`f${idx}`] +=  score.gross;
					} else {
						last6[`f${idx}`] +=  score.gross;
					}
				}
			});
		});		
		return { title, total, scoreLines }		
	}
}