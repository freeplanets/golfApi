import { Injectable } from "@nestjs/common";
import defaultService from "../common/defaultService";
import { sideGame, sideGameKey } from "../db.interface";
import { InjectModel, Model } from "nestjs-dynamoose";

@Injectable()
export default class SideGamesService extends defaultService<sideGame, sideGameKey> {
	constructor(
		@InjectModel('SideGames')
		private sidegamesModel:Model<sideGame, sideGameKey>,
	){
		super(sidegamesModel);
	}
}