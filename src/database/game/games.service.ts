import { Injectable } from "@nestjs/common";
import defaultService from "../common/defaultService";
import { gameKey, games, playerDefault, sideGame } from "../db.interface";
import { InjectModel, Model } from "nestjs-dynamoose";
import _partialPlayerObject from "../../models/game/_partialPlayerObject";

@Injectable()
export default class GamesService extends defaultService<games, gameKey> {
	constructor(
		@InjectModel('Games')
		private gamesModel:Model<games, gameKey>,
	){
		super(gamesModel);
	}
	async setPlayerDefault(gameid:string, data:playerDefault[]) {
		const key:gameKey = {
			gameid,
		};
		return super.update(key, {playerDefaults: data});
	}
	async registerSideGame(gameid:string, data:sideGame){
		const key:gameKey = {
			gameid,
		};
		const f = await super.query(key, ['sideGames']);
		if (f[0]) {
			const sideGames = f[0].sideGames.map((item) => {
				if (item.sideGameName === data.sideGameName) return data;
				return item;
			});
			return super.update(key, {sideGames});
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
}