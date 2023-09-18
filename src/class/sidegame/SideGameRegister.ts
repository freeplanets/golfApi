import { sideGameFormat, sideGames } from "../../models/enum";
import { gameKey, player, sideGame } from "../../database/db.interface";
import { AnyObject } from "../../models/if";
import GamesService from "../../database/game/games.service";
import { removeUnderLineData } from "../../function/Commands";
import { scoreLine, sideGameRes } from "../../function/func.interface";
import recordLine from "../common/recordLine";
import SideGameCreator from "./SideGameCreator";
import ScoresUpdater from "../players/ScoresUpdater";
import { holesPlayerScore } from "../class.if";
import SideGameScoreFactory from "../sidegamescore/SideGameScoreFactory";
import stringScore from "../common/stringScore";

interface gObj {
	[key:string]:number;
}

export default class SideGameRegister {
	private rline = new recordLine();
	private sc = new stringScore();
	private sidegame:sideGame;
	constructor(private dbService:GamesService, private gameid:string, sidegame:sideGame){
		sidegame = removeUnderLineData(sidegame);
		if ((sidegame as any).gameid !== undefined) delete (sidegame as any).gameid;
		if ((sidegame as any).f0 !== undefined) delete (sidegame as any).f0;
		this.sidegame = sidegame;
	}
	async checkIn() {
		if(this.checkData()) {
			const key:gameKey = {
				gameid: this.gameid,
			}
			const res:sideGameRes = {
				sideGameTitle: [],
				sideGameScore:[],
				sideGameTotal: [this.rline.newline('total')],
			}
			console.log('check1', new Date().toLocaleString());
			const qG = await this.dbService.query(key, ['stepInZone', 'stepInFairway', 'players', 'playerDefaults', 'sideGames']);
			console.log('check2', new Date().toLocaleString());
			if (qG.count> 0) {
				const game = qG[0];
				const startHoleNo = this.getStartHoleNo(game.stepInZone, game.stepInFairway, game.players[0]);
				let curSG:sideGame | false;
				if (this.sidegame.sidegameid) {
					const fIdx = game.sideGames.findIndex((sg) => sg.sidegameid === this.sidegame.sidegameid);
					if (fIdx !== -1) {
						curSG = new SideGameCreator(this.sidegame, game, startHoleNo).create();
						if (curSG) game.sideGames[fIdx] = curSG;
						else {
							console.log('chk0', curSG);
							return false;
						}
					} else {
						console.log('chk1', curSG);
						return false;
					}
				} else {
					if (!game.sideGames) game.sideGames = [];
					console.log('check3', new Date().toLocaleString());
					curSG = new SideGameCreator(this.sidegame, game, startHoleNo).create();
					console.log('check4', new Date().toLocaleString());
					if (curSG) {
						game.sideGames.push(curSG);
					} else {
						console.log('chk2', curSG);
						return false;
					}
				}
				console.log('check5', new Date().toLocaleString());
				this.reCalc(game.stepInZone, game.stepInFairway, game.sideGames, game.players);
				console.log('check6', new Date().toLocaleString(), key);
				await this.dbService.update(key, {sideGames:game.sideGames});
				console.log('check7', new Date().toLocaleString());
				const stitle:scoreLine= this.rline.newline('name');
				game.playerDefaults.forEach((player, idx) => {
					stitle[`f${idx+1}`] = player.playerName;
				});
				res.sideGameTitle.push(stitle);
				res.sideGameScore = game.sideGames.map((sg) => {
					res.sideGameTotal[0].f1 = this.sc.add(res.sideGameTotal[0].f1, sg.extraInfo.total.f1);
					res.sideGameTotal[0].f2 = this.sc.add(res.sideGameTotal[0].f2, sg.extraInfo.total.f2);
					res.sideGameTotal[0].f3 = this.sc.add(res.sideGameTotal[0].f3, sg.extraInfo.total.f3);
					res.sideGameTotal[0].f4 = this.sc.add(res.sideGameTotal[0].f4, sg.extraInfo.total.f4);
					return sg.extraInfo.total
				});
				console.log('check8', new Date().toLocaleString());				
				return res;
			} else {
				console.log('game not found', key);
				return false;
			}			
		}
		console.log('check player error');
		return false;
	}
	checkPlayer():boolean {
		let ans:boolean = false;
		let noGamePlayers = 4;
		const group:AnyObject = {}
		if (this.sidegame.format === sideGameFormat.individual) {
			noGamePlayers = 2;
			this.sidegame.playerGameData.forEach((player) => {
				if (player.selected) noGamePlayers--;
			});
			
			ans = noGamePlayers < 1;
			console.log('checkPlayer1' , noGamePlayers, ans);
		} else {
			this.sidegame.playerGameData.forEach((player) => {
				if (player.selected) noGamePlayers--;
				if (!group[player.betterballGroup]) group[player.betterballGroup] = 0;
				group[player.betterballGroup]++;	
			});
			const isRightGroup = Object.keys(group).every((key) => group[key] === 2);
			ans = isRightGroup && (noGamePlayers < 1);
			console.log('checkPlayer2' , noGamePlayers, ans);
		}
		return ans;
	}
	reCalc(zoneid:string, fairwayno:number,sideGs:sideGame[], player:player[]){
		const sUpdater = new ScoresUpdater(player);
		const sgsf = new SideGameScoreFactory(sideGs);
		let holeNo = this.getStartHoleNo(zoneid, fairwayno, player[0]);
		if (holeNo) {
			let hasScore = false;
			do {
				const holeScore = sUpdater.getScores(holeNo);
				hasScore = sUpdater.scoreCheckIfAllHasScore(holeScore);
				if (hasScore) {
					sgsf.addScore(holeScore);
				}
				holeNo ++ 
			} while(hasScore);
		}
	}

	private checkData():boolean {
		switch(this.sidegame.sideGameName) {
			case sideGames.HESSEIN:
				// 至少三人參加
				return this.numberOfPlayersCheck(3);
			case sideGames.LAS_VEGAS:
			case sideGames.SIXES:
				// 四人全部參加
				return this.numberOfPlayersCheck(4);
			case sideGames.BIRDIES:
			case sideGames.EAGLES:
			case sideGames.PARS:
				this.sidegame.format = sideGameFormat.individual;
			default:
				return this.checkAll();
		}
	}
	private checkAll() {
		let ans = false;
		if (this.sidegame.format === sideGameFormat.individual) {
			ans = this.numberOfPlayersCheck(2);
		} else {
			ans = this.groupCheck();
		}
		return ans;
	}	
	private numberOfPlayersCheck(count:number):boolean {
		let cnt = 0;
		this.sidegame.playerGameData.forEach((player) => {
			if (player.selected) cnt++;
		});
		return cnt >= count;
	}
	private groupCheck(){
		const chk = this.numberOfPlayersCheck(4);
		if (!chk) return false;
		const g:gObj = {}
		this.sidegame.playerGameData.forEach((player) => {
			if (!g[`${player.betterballGroup}`]) g[`${player.betterballGroup}`] = 1;
			else g[`${player.betterballGroup}`]+=1;
		});
		return g.A === g.B;
	}
	getStartHoleNo(zoneid:string, fairwayno:number, anyPlayer:player) {
		// return this.oldPlayers[0].holes.find((h) => h.zoneid === zoneid && h.fairwayno === fairwayno).holeNo;
		return anyPlayer.holes.find((h) => h.zoneid === zoneid && h.fairwayno === fairwayno).holeNo;
	}
}