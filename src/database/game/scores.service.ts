import { Injectable } from "@nestjs/common";
import defaultService from "../common/defaultService";
import { scorekey, scores } from "../db.interface";
import { InjectModel, Model } from "nestjs-dynamoose";

@Injectable()
export default class ScoresService extends defaultService<scores, scorekey> {
	constructor(
		@InjectModel('Scores')
		scoresModel:Model<scores, scorekey>,
	){
		super(scoresModel);
	}
}