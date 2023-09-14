import { scoreLine, scoresData } from "../../function/func.interface";
import { player, score } from "../../database/db.interface";
import { holesPlayerScore, playerScore } from "../class.if";
import PlayerUpdater from "./playerUpdater";
import { scoreZone } from "../../models/enum";

export default class ScoresUpdater {
	private playerObjs:PlayerUpdater[];
	private updatedHoles:number[];
	constructor(private oldPlayers:player[]){
		this.updatedHoles = [];
		this.playerObjs = this.oldPlayers.map((itm) => new PlayerUpdater(itm));
		console.log('Updater Created:', new Date().toLocaleString());
		// this.update();
	}
	update(scores:scoresData) {
		let data:scoreLine[];
		let zone='';
		if (scores.front) {
			data = scores.front;
			zone = 'front';
		} else {
			data = scores.back;
			zone = 'back';
		}
		//console.log(data, zone);
		data.forEach((itm) => {
			if (itm.f0 === 'PAR' || itm.f0 === 'HDCP') return;
			const playerName = itm.f0;
			const scores = this.regroupdata(zone, itm);
			const f = this.playerObjs.find((p) => p.playerName === playerName);
			if (f) {
				// console.log('do update:', f.playerName, scores);
				f.update(scores);
				// itm.gross = f.gross;
				// console.log(f.updatedHoles);
				this.checkUpdatedHoles(f.updatedHoles);
				// console.log(this.UpdatedHoles);
			} else {
				console.log(`${playerName} data not found`);
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
		const scores = this.oldPlayers.map((player) => {
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
		// console.log('regroupdata', data);
		Object.keys(data).forEach((key) => {
			if (key==='f0') return;
			const hole:Partial<score> = {
				holeNo: add + parseInt(key.replace('f', ''),10),
				gross: data[key] ?  parseInt(data[key], 10) : 0,
			};
			holes.push(hole);
		});
		return holes;
	}
	scoreCheckIfAllHasScore(score:holesPlayerScore){
		return score.scores.every((score) => score.gross > 0);
	}	
}