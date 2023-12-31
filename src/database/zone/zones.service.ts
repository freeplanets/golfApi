import { Injectable } from "@nestjs/common";
import { zones, zoneKey } from "../db.interface";
import { InjectModel, Model } from "nestjs-dynamoose";
import defaultService from "../common/defaultService";

@Injectable()
export default class ZonesService extends defaultService<zones, zoneKey> {
	constructor(
		@InjectModel('Zones')
		private zoneModel:Model<zones, zoneKey>,
	){
		super(zoneModel);
	}
}
/*
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
*/