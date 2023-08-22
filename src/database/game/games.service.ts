import { Injectable } from "@nestjs/common";
import defaultService from "../common/defaultService";
import { gameKey, games, playerDefault, playerGameData, sideGame } from "../db.interface";
import { InjectModel, Model } from "nestjs-dynamoose";
import _partialPlayerObject from "../../models/game/_partialPlayerObject";
import { HcpType } from "../../models/enum";
import SideGameCreator from "../../class/sidegame/SideGameCreator";
import scoresRequest from "../../models/game/scoresRequest";

@Injectable()
export default class GamesService extends defaultService<games, gameKey> {
	constructor(
		@InjectModel('Games')
		private gamesModel:Model<games, gameKey>,
	){
		super(gamesModel);
	}
	async registerSideGame(gameid:string, data:sideGame){
		const key:gameKey = {
			gameid,
		};
		const f = await super.query(key, ['stepInZone', 'stepInFairway', 'players', 'playerDefaults', 'sideGames']);
		if (f.count > 0) {
			const game = f[0];
			if (!game.sideGames) game.sideGames = [];
			const fIdx = game.sideGames.findIndex((itm) => itm.sideGameName === data.sideGameName);
			data = new SideGameCreator(data, game).create();
			if (fIdx === -1){
				game.sideGames.push(data);
			} else {
				game.sideGames[fIdx] = data;
			}
			return this.update(key, game);
		}
		return undefined;
	}

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
	async updatePlayerGamePoint(gameid:string, playerName:string, data:scoresRequest){
		const key:gameKey = {
			gameid,
		};
		const f = await super.query(key, ['players','sideGames']);
		if (f) {
			const sideGames = f[0].sideGames;
			const oldPlayers = f[0].players;
			const pl = oldPlayers.find((player) => player.playerName === playerName);
			if (pl) {
				 data.holes.forEach((score) => {
					const f = pl.holes.find((hole) => hole.holeNo === score.holeNo);
					if (f) {
						f.gross = score.gross;
					}
				 });
			}
			return this.update(key, {players:oldPlayers});
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
}