import { sideGameFormat, sideGames } from "../../models/enum";
import { gameKey, player, playerDefault, sideGame, sideGameKey } from "../../database/db.interface";
import { AnyObject } from "../../models/if";
import GamesService from "../../database/game/games.service";
import { removeUnderLineData } from "../../function/Commands";
import { scoreLine, sideGameRes } from "../../function/func.interface";
import recordLine from "../common/recordLine";
import SideGameCreator from "./SideGameCreator";
import ScoresUpdater from "../players/ScoresUpdater";
import SideGameScoreFactory from "../sidegamescore/SideGameScoreFactory";
import stringScore from "../common/stringScore";
import SideGamesService from "../../database/sidegame/sidegames.service";

interface gObj {
	[key:string]:number;
}
enum actionValue {
	NEW = "new",
	EDIT = 'edit',
}
export default class SideGameRegister {
	private rline = new recordLine();
	private sc = new stringScore();
	// private sidegame:sideGame;
	private action = "";
	constructor(private dbService:GamesService,private sgService:SideGamesService, private gameid:string){

	}
	async delSideGame(sidegameid: string) {
		return this.sgService.delete({sidegameid});
	}
	async updateWhenPlayerDefaultsChange(){}
	async getSideGameScore(playerDefaults?:playerDefault[]) {
		const res:sideGameRes = {
			sideGameTitle: [],
			sideGameScore:[],
			sideGameTotal: [this.rline.newline('total')],
		}
		if (!playerDefaults) {
			const ga = await this.dbService.query({gameid:this.gameid}, ['playerDefaults']);
			// console.log(this.gameid, 'check playerDefaults', ga);
			playerDefaults = ga[0].playerDefaults;
		}
		const stitle:scoreLine= this.rline.newline('name');
		playerDefaults.forEach((player, idx) => {
			stitle[`f${idx+1}`] = player.playerName;
		});
		const sgs = await this.sgService.query({gameid: this.gameid}, ['sideGameName','sidegameid','extraInfo']);
		console.log('getSideGameScore after query', new Date().toLocaleString());
		res.sideGameTitle.push(stitle);
		if (sgs.count > 0) {
			res.sideGameScore = sgs.map((sg) => {
				console.log(sg.sideGameName, sg.sidegameid, sg.extraInfo);
				res.sideGameTotal[0].f1 = this.sc.add(res.sideGameTotal[0].f1, sg.extraInfo.total.f1);
				res.sideGameTotal[0].f2 = this.sc.add(res.sideGameTotal[0].f2, sg.extraInfo.total.f2);
				res.sideGameTotal[0].f3 = this.sc.add(res.sideGameTotal[0].f3, sg.extraInfo.total.f3);
				res.sideGameTotal[0].f4 = this.sc.add(res.sideGameTotal[0].f4, sg.extraInfo.total.f4);
				return sg.extraInfo.total
			});
		}
		console.log('getSideGameScore end', new Date().toLocaleString());
		return res;
	}
	async getSideGameData(sidegameid:string) {
		const sgd = await this.sgService.findOne({sidegameid});
		// delete sgd.extraInfo;
		sgd.playerGameData = sgd.playerGameData.map((pg) => {
			delete pg.holes;
			delete pg.extraInfo;
			return pg;
		});
		return sgd;
	}
	async getSideGameDetail(sidegameid:string){
		const sideGameDetail:AnyObject = {}
		const sgs = await this.sgService.query({sidegameid}, ['sideGameName', 'extraInfo']);
		if (sgs.count>0) {
			const f = sgs[0];
			sideGameDetail.sideGameName = f.sideGameName;
			if (f && f.extraInfo && f.extraInfo.gameDetail) {
				sideGameDetail.detail = f.extraInfo.gameDetail; 
			} else {
				sideGameDetail.detail = [];
			}
		}
		return sideGameDetail;	
	}
	async checkIn(sidegame:sideGame) {
		this.action = (sidegame as any)._action;
		sidegame = removeUnderLineData(sidegame);
		if ((sidegame as any).gameid !== undefined) delete (sidegame as any).gameid;
		if ((sidegame as any).f0 !== undefined) delete (sidegame as any).f0;
		// this.sidegame = sidegame;		
		if(this.checkData(sidegame)) {
			const key:gameKey = {
				gameid: this.gameid,
			}
			console.log('check1', new Date().toLocaleString());
			const qG = await this.dbService.query(key, ['stepInZone', 'stepInFairway', 'players', 'playerDefaults']); //, 'sideGames']);
			console.log('check2', new Date().toLocaleString());
			if (qG.count> 0) {
				const game = qG[0];
				const startHoleNo = this.getStartHoleNo(game.stepInZone, game.stepInFairway, game.players[0]);
				let curSG:sideGame;
				console.log('check3', new Date().toLocaleString());
				const chkCreate = new SideGameCreator(sidegame, game, startHoleNo).create();
				if (chkCreate) {
					curSG = chkCreate;
				} else {
					return false;
				}
				console.log('check4', new Date().toLocaleString());
				if (!curSG) return false;
				this.reCalc(game.stepInZone, game.stepInFairway, [ curSG ], game.players);
				console.log('check5', new Date().toLocaleString(), key);
				console.log('sidegameData:', JSON.stringify(curSG));
				if (!curSG.gameid) curSG.gameid = this.gameid;
				switch(this.action) {
					case actionValue.NEW:
						await this.sgService.create(curSG);
						break;
					case actionValue.EDIT:
						const sgKey:sideGameKey = {
							sidegameid: curSG.sidegameid,
						};
						console.log('check sidegameid:', sgKey);
						delete curSG.sidegameid;
						await this.sgService.update(sgKey, curSG)
						break;
					default:
						console.log('sidegame action not found!', this.action);
						return false;
				}
				// await this.dbService.update(key, {sideGames:game.sideGames});
				console.log('check6', new Date().toLocaleString());
				return  await this.getSideGameScore(game.playerDefaults);
			} else {
				console.log('game not found', key);
				return false;
			}			
		}
		console.log('check player error');
		return false;
	}
	/*
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
				console.log('sidegameData:', JSON.stringify(game.sideGames));
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
	*/
	checkPlayer(sidegame:sideGame):boolean {
		let ans:boolean = false;
		let noGamePlayers = 4;
		const group:AnyObject = {}
		if (sidegame.format === sideGameFormat.individual) {
			noGamePlayers = 2;
			sidegame.playerGameData.forEach((player) => {
				if (player.selected) noGamePlayers--;
			});
			
			ans = noGamePlayers < 1;
			console.log('checkPlayer1' , noGamePlayers, ans);
		} else {
			sidegame.playerGameData.forEach((player) => {
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

	private checkData(sidegame:sideGame):boolean {
		switch(sidegame.sideGameName) {
			case sideGames.HESSEIN:
				// 至少三人參加
				return this.numberOfPlayersCheck(sidegame, 3);
			case sideGames.LAS_VEGAS:
			case sideGames.SIXES:
				// 四人全部參加
				return this.numberOfPlayersCheck(sidegame, 4);
			case sideGames.BIRDIES:
			case sideGames.EAGLES:
			case sideGames.PARS:
				sidegame.format = sideGameFormat.individual;
			default:
				return this.checkAll(sidegame);
		}
	}
	private checkAll(sidegame:sideGame) {
		let ans = false;
		if (sidegame.format === sideGameFormat.individual) {
			ans = this.numberOfPlayersCheck(sidegame, 2);
		} else {
			ans = this.groupCheck(sidegame);
		}
		return ans;
	}	
	private numberOfPlayersCheck(sidegame:sideGame, count:number):boolean {
		let cnt = 0;
		sidegame.playerGameData.forEach((player) => {
			if (player.selected) cnt++;
		});
		return cnt >= count;
	}
	private groupCheck(sidegame:sideGame){
		const chk = this.numberOfPlayersCheck(sidegame, 4);
		if (!chk) return false;
		const g:gObj = {}
		sidegame.playerGameData.forEach((player) => {
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