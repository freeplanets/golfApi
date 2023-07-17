import { Injectable } from "@nestjs/common";
import { defaultKey, fairwayInfo } from "../db.interface";
import { InjectModel, Model } from "nestjs-dynamoose";
import defaultService from "../common/defaultService";

@Injectable()
export default class FairwayService extends defaultService<fairwayInfo, defaultKey> {
	constructor(
		@InjectModel('Fairway')
		private fairwayModel:Model<fairwayInfo, defaultKey>,
	){
		super(fairwayModel)
	}
}
/*
export default class FairwayService implements defaultMethod<fairwayInfo, defaultKey> {
	constructor(
		@InjectModel('Fairway')
		private fairwayModel:Model<fairwayInfo, defaultKey>,
	){}
	create(data:fairwayInfo) {
		return this.fairwayModel.create(data);
	}
	update(key: defaultKey, data: Partial<fairwayInfo>): Promise<fairwayInfo> {
		return this.fairwayModel.update(key, data);
	}
	findOne(key: defaultKey): Promise<fairwayInfo> {
		return this.fairwayModel.get(key);
	}
	findAll(): Promise<fairwayInfo[]> {
		return this.fairwayModel.scan().exec();
	}
	query(keys:Partial<fairwayInfo>){
		return this.fairwayModel.query(keys).exec();	
	}
	delete(key: defaultKey): Promise<void> {
		return this.fairwayModel.delete(key);
	}
}
*/