import { Injectable } from "@nestjs/common";
import defaultService from "../common/defaultService";
import { gameKey, games, playerDefault, playerGameData, score, sideGame } from "../db.interface";
import { InjectModel, Model } from "nestjs-dynamoose";
import _partialPlayerObject from "../../models/game/_partialPlayerObject";
import { HcpType } from "../../models/enum";
import SideGameCreator from "../../class/sidegame/SideGameCreator";
import { scoreLine, scoresData, sideGameRes } from "../../function/func.interface";
import { createScoreData, removeUnderLineData } from "../../function/Commands";

@Injectable()
export default class GamesService extends defaultService<games, gameKey> {
	constructor(
		@InjectModel('Games')
		private gamesModel:Model<games, gameKey>,
	){
		super(gamesModel);
	}
	/*
	async registerSideGame(gameid:string, data:sideGame){
		const key:gameKey = {
			gameid,
		};
		const res:sideGameRes = {
			sideGameTitle: [],
			sideGameScore:[],
			sideGameTotal: [this.newline('total')],
		}
		const f = await super.query(key, ['stepInZone', 'stepInFairway', 'players', 'playerDefaults', 'sideGames']);
		if (f.count > 0) {
			data = removeUnderLineData(data);
			//沒有人參加則刪除
			let playerCounter = 0;
			data.playerGameData.forEach((pl) => {
				if (pl.selected) playerCounter++;
			});
			const forDel = playerCounter < 2;
			if ((data as any).gameid !== undefined) delete (data as any).gameid;
			if ((data as any).f0 !== undefined) delete (data as any).f0;
			const game = f[0];
			const stitle:scoreLine= this.newline('name');
			game.playerDefaults.forEach((player, idx) => {
				stitle[`f${idx+1}`] = player.playerName;
			});
			res.sideGameTitle.push(stitle);
			if (!data.sidegameid) {
				if (!game.sideGames) game.sideGames = [];
				data = new SideGameCreator(data, game).create();
				game.sideGames.push(data);
			} else {
				const fIdx = game.sideGames.findIndex((itm) => itm.sidegameid === data.sidegameid);
				if (forDel) {
					game.sideGames.splice(fIdx,1);
				} else {
					game.sideGames[fIdx] = data;
				}
			}
			await this.update(key, game);
			res.sideGameScore = game.sideGames.map((sg) => this.newline(sg.sideGameName, '', '', '', '', sg.sidegameid));
		}
		return res;
	}
	*/

	async updateGamesPoint(gameid:string, data:Partial<games>){
		const key:gameKey = {
			gameid,
		};
		const f = await super.query(key, ['players','sideGames']);
		if (f) {
			const sideGames = f[0].sideGames;
			const oldPlayers = f[0].players;

		}
		return this.update(key, data);
	}
	async updatePlayerGamePoint(data:scoresData){
		const key:gameKey = {
			gameid: data.gameid,
		};
		const f = await super.query(key, ['players','sideGames']);
		if (f) {
			const sideGames = f[0].sideGames;
			const oldPlayers = f[0].players;
			let zone = '';
			let score:scoreLine[];
			if (data.front) {
				zone = 'front';
				score = data.front;
			}
			if (data.back){
				zone = 'back';
				score = data.back;
			}
			score.forEach((itm) => {
				if (itm.f0 === 'PAR' || itm.f0 === 'HDCP') return;
				const playerName = itm.f0;
				const pl = oldPlayers.find((player) => player.playerName === playerName);
				if (pl) {
					Object.keys(itm).forEach((key) => {
						// console.log(playerName, key, itm[key])
						if (key != 'f0' && itm[key]) {
							const fairwayno = parseInt(key.replace('f', ''), 10);
							let f:score;
							if (zone === 'front') {
								f = pl.holes.find((hole) => hole.fairwayno === fairwayno && hole.holeNo < 10);
							} else {
								f = pl.holes.find((hole) => hole.fairwayno === fairwayno && hole.holeNo > 9);
							}
							if (f) {
								f.gross = parseInt(itm[key], 10);
								f.parDiff = f.gross - f.par;
								// console.log('update:', f);
							}
						}
					})
					pl.parDiff = 0;
					pl.gross = 0;
					pl.frontGross = 0;
					pl.backGross = 0;
					pl.holes.forEach((s) => {
						if (s.holeNo < 10) pl.frontGross += s.gross;
						else pl.backGross += s.gross;
						pl.gross += s.gross;
						pl.parDiff += s.parDiff;
					})
					// console.log('update:', pl);
				}
			});
			await this.update(key, {players:oldPlayers});
			return createScoreData(data.gameid, oldPlayers);
		}	
	}
	async updateGamePoint(gameid:string, data:_partialPlayerObject){
		const key:gameKey = {
			gameid,
		};
		const f = await super.query(key, ['players']);
		if (f[0]) {
			const players = f[0].players.map((item) => {
				if (item.playerName === data.playerName) {
					data.holes.forEach((score) => {
						item.holes.every((oldsore) => {
							if (oldsore.zoneid === score.zoneid && oldsore.fairwayno === score.fairwayno) {
								oldsore.gross = score.gross;
								return false;
							}
						})
					});
				} 
				return item;
			});
			return this.update(key, {players});
		}
		return undefined;		
	}
	handicapCheck(type:HcpType, playerD:playerDefault[], playerGD:playerGameData[]):playerGameData[]{
		switch(type) {
			case HcpType.NoHcp:
				return playerGD.map((itm) => {
					itm.hcp = '0';
					return itm;
				});
			case HcpType.FullHcp:
				return playerGD.map((itm) => {
					const f = playerD.find((p) => p.playerName === itm.playerName);
					if (f) {
						itm.hcp = f.hcp;
					}
					return itm;
				})
			case HcpType.HcpDiff:
				const hcps = playerD.map((itm) => itm.hcp);

		}
		return playerGD;
	}
	hcpDiifRef(hcps:string[]) {
		let newHcps=[];
		hcps.forEach((itm) => {
			newHcps[itm] = parseInt(itm.replace('+', '-'), 10);
		})
	}
	private newline(f0='', f1='', f2='', f3='', f4='', f5= ''):scoreLine {
		const ans:scoreLine = { f0, f1, f2, f3, f4 };
		if (f5) ans.f5 = f5;
		return ans;
	}
}