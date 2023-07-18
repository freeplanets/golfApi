import { Injectable } from "@nestjs/common";
import { InjectModel, Model, ItemSaveSettings, QueryResponse } from "nestjs-dynamoose";
import { carPosition, carPositionHistory, defaultKey, defaultMethod } from "../db.interface";
import { transaction } from "dynamoose";
import { hashKey } from "../../function/Commands";

@Injectable()
export default class CarPositionService implements defaultMethod<carPosition, defaultKey> {
	constructor(
		@InjectModel('CarPosition')
		private carPositionModel:Model<carPosition, defaultKey>,
		@InjectModel('CarPositionHistory')
		private carPositionHistoryModel:Model<carPositionHistory, defaultKey>,
	){}
	async create(data: carPosition): Promise<any> {
		const dataH = this.createHistoryData(data);
		await transaction([
			this.carPositionModel.transaction.create(data, {return: 'request'}),
			this.carPositionHistoryModel.transaction.create(dataH,),
		]);
		return this.getCarsInFairway(data);
	}
	async update(key: defaultKey, data: Partial<carPosition>): Promise<any> {
		const dataH = this.createHistoryData(data as carPosition);
		await transaction([
			this.carPositionModel.transaction.update(key, data),
			this.carPositionHistoryModel.transaction.create(dataH,),
		]);
		return this.getCarsInFairway(data as carPosition);
	}
	async findOne(key: defaultKey): Promise<carPosition> {
		return this.carPositionModel.get(key);
	}
	async findAll(): Promise<carPosition[]> {
		return this.carPositionModel.scan().exec();
	}
	async query(key: Partial<carPosition>): Promise<QueryResponse<carPosition>> {
		return this.carPositionModel.query(key).exec();
	}
	async delete(key: defaultKey): Promise<void> {
		return this.carPositionModel.delete(key);
	}
	async queryHistory(key:Partial<carPositionHistory>):Promise<carPositionHistory[]> {
		return this.carPositionHistoryModel.query(key).exec();
	}
	async getCarsInFairway(data:Partial<carPosition>):Promise<carPosition[]> {
		const keys:Partial<carPosition> = {
			clubid: data.clubid,
			zoneid: data.zoneid,
			fairwayid: data.fairwayid,
		}
		return this.query(keys);
	}
	private createHistoryData(data:carPosition):carPositionHistory {
		return {
			id: hashKey(),
			clubid: data.clubid,
			carid: data.carid,
			location: data.location,
		}
	}
}