import { Injectable } from "@nestjs/common";
import defaultService from "../common/defaultService";
import { gameKey, games } from "../db.interface";
import { InjectModel, Model } from "nestjs-dynamoose";

@Injectable()
export default class GamesService extends defaultService<games, gameKey> {
	constructor(
		@InjectModel('Games')
		private gamesModel:Model<games, gameKey>,
	){
		super(gamesModel);
	}
}