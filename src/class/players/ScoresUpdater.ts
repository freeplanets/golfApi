import { scoreLine, scoresData } from "src/function/func.interface";
import { player, score } from "../../database/db.interface";
import { holesPlayerScore, playerScore } from "../class.if";
import PlayerUpdater from "./playerUpdater";
import { scoreZone } from "src/models/enum";

export default class ScoresUpdater {
	private playerObjs:PlayerUpdater[];
	private updatedHoles:number[];
	constructor(private oldPlayers:player[]){
		this.updatedHoles = [];
		this.playerObjs = this.oldPlayers.map((itm) => new PlayerUpdater(itm));
		// this.update();
	}
	private update(scores:scoresData) {
		let data:scoreLine[];
		let zone='';
		if (scores.front) {
			data = scores.front;
			zone = 'front';
		} else {
			data = scores.back;
			zone = 'back';
		}
		data.forEach((itm) => {
			if (itm.f0 === 'PAR' || itm.f0 === 'HDCP') return;
			const playerName = itm.f0;
			const f = this.playerObjs.find((p) => p.playerName === playerName);
			if (f) {
				f.update(itm);
				itm.gross = f.gross;
				this.checkUpdatedHoles(f.updatedHoles);
			}
		});
	}
	private checkUpdatedHoles(holes:number[]) {
		holes.forEach((no) => {
			const f = this.updatedHoles.find((hole) => hole === no);
			if (!f) this.updatedHoles.push(no);
		});
		if (this.updatedHoles.length>0) {
			this.updatedHoles.sort((a, b) => a - b);
		}
	}
	getScores(holeNo:number):holesPlayerScore {
		const scores = this.newPlayers.map((player) => {
			const tmp:playerScore = {
				playerName: player.playerName,
				playerOrder:player.playerOrder,
				gross: 0,
				parDiff: 0,
			}
			const f = player.holes.find((hole) => hole.holeNo === holeNo);
			if (f) {
				tmp.gross = f.gross;
				tmp.parDiff = f.parDiff;
			}
			return tmp;
		});
		return {
			holeNo,
			scores,
		}
	}
	get UpdatedHoles() {
		if (this.updatedHoles.length > 0) {
			return this.updatedHoles[0];
		}
		return 0;
	}
	regroupdata(zone:string, data:scoreLine) {
		const p:Partial<player> = {
			playerName: data.f0,
		}
		const holes:Partial<score>[]=[];
		let add = 0;
		if (zone === scoreZone.back) {
			add = 9;
		}
		Object.keys(data).forEach((key) => {
			if (key='f0') return;
			const hole:Partial<score> = {
				
			}
		})
	}
}