import { Injectable } from "@nestjs/common";
import { InjectModel, Model } from "nestjs-dynamoose";
import Club from "../db.interface";
import { defaultMethod, defaultKey } from "../db.interface";

@Injectable()
export default class ClubService implements defaultMethod<Club, defaultKey>{
	constructor(
		@InjectModel('Club')
		private clubModel:Model<Club, defaultKey>,
  ) {}
	
	create(club:Club) {
		return this.clubModel.create(club);
	}
	update(key: defaultKey, club: Partial<Club>) {
		return this.clubModel.update(key, club);
	}
	findOne(key: defaultKey) {
		return this.clubModel.get(key);
	}
	findAll() {
		return this.clubModel.scan().exec();
	}
}