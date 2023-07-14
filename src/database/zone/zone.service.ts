import { Injectable } from "@nestjs/common";
import { Zone, defaultMethod, defaultKey } from "../db.interface";
import { InjectModel, Model } from "nestjs-dynamoose";

@Injectable()
export default class ZoneService implements defaultMethod<Zone, defaultKey> {
	constructor(
		@InjectModel('Zone')
		private zoneModel:Model<Zone, defaultKey>,
	){}

	create(data: Zone): Promise<Zone> {
		return this.zoneModel.create(data);
	}
	update(key: defaultKey, data: Partial<Zone>): Promise<Zone> {
		return this.zoneModel.update(key, data);
	}	
	findOne(key: defaultKey): Promise<Zone> {
		return this.zoneModel.get(key);
	}
	findAll(): Promise<Zone[]> {
		return this.zoneModel.scan().exec();
	}
	query(keys:Partial<Zone>){
		return this.zoneModel.query(keys).exec();
	}
}