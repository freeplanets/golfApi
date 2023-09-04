import { sideGames } from "../../models/enum";
import { sideGame } from "../../database/db.interface";
import ASideGameScore from "./ASideGameScore";
import Stableford from "./StableFord";
import ModifiedStableford from "./ModifiedStableford";
import Birdies from "./Birdies";
import Eagles from "./Eagles";
import Hessein from "./Hessein";
import LasVegas from "./LasVegas";
import Matchplay from "./MatchPlay";
import Nassau from "./Nassau";
import Pars from "./Pars";
import Sixes from "./Sixes";
import Skin from "./Skin";
import StrokePlay from "./StrokePlay";
import { holesPlayerScore } from "../class.if";

export default class SideGameScoreFactory {
	private sideG:ASideGameScore[]=[];
	constructor(private sideGs:sideGame[]){
		this.sideGs.forEach((sideGame) => {
			switch(sideGame.sideGameName){
				case sideGames.STABLEFORD:
					this.sideG.push(new Stableford(sideGame));
					break;
				case sideGames.MODIFIED_STABLEFORD:
					this.sideG.push(new ModifiedStableford(sideGame));
					break;
				case sideGames.BIRDIES:
					this.sideG.push(new Birdies(sideGame));
					break;
				case sideGames.EAGLES:
					this.sideG.push(new Eagles(sideGame));
					break;
				case sideGames.HESSEIN:
					this.sideG.push(new Hessein(sideGame));
					break;
				case sideGames.LAS_VEGAS:
					this.sideG.push(new LasVegas(sideGame));
					break;
				case sideGames.MATCH_PLAY:
					this.sideG.push(new Matchplay(sideGame));
					break;
				case sideGames.NASSAU:
					this.sideG.push(new Nassau(sideGame));
					break;
				case sideGames.PARS:
					this.sideG.push(new Pars(sideGame));
					break;
				case sideGames.SIXES:
					this.sideG.push(new Sixes(sideGame));
					break;
				case sideGames.SKIN:
					this.sideG.push(new Skin(sideGame));
					break;
				case sideGames.STROKE_PLAY:
					this.sideG.push(new StrokePlay(sideGame));
					break;
			}
		})
	}
	addScore(score:holesPlayerScore){
		this.sideG.forEach((sg) => {
			sg.calc(score);
			const tmp = sg.getResult();
		});
	}
}