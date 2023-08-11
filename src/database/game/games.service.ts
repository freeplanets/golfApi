import { Injectable } from "@nestjs/common";
import defaultService from "../common/defaultService";
import { gameKey, games, playerDefault, playerGameData, sideGame } from "../db.interface";
import { InjectModel, Model } from "nestjs-dynamoose";
import _partialPlayerObject from "../../models/game/_partialPlayerObject";
import { HcpType } from "../../models/enum";

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
		const ans = await super.query(key, ['playerDefaults','sideGames']);
		if (ans.count > 0) {
			const game = ans[0];
			const fIdx = game.sideGames.findIndex((itm) => itm.sideGameName === data.sideGameName);
			if (fIdx === -1){
				game.sideGames.push(data);
			} else {
				game.sideGames[fIdx] = data;
			}
			return this.update(key, game);
		}
		return undefined;
	}
	async updateGamePoint(gameid:string, data:_partialPlayerObject){
		const key:gameKey = {
			gameid,
		};
		const f = await super.query(key, ['player']);
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
			return super.update(key, {players});
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