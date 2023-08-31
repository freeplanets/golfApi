import { Injectable } from "@nestjs/common";
import defaultService from "../common/defaultService";
import { deviceHistory, deviceKey, devices } from "../db.interface";
import { InjectModel, Model } from "nestjs-dynamoose";
import DeviceHistoryService from "./deviceHistory.service";
import { hashKey } from "../../function/Commands";
import { ConditionInitializer } from "dynamoose/dist/Condition";

@Injectable()
export default class DevicesService extends defaultService<devices, deviceKey> {
	private historyService:DeviceHistoryService;
	constructor(
		@InjectModel('Devices')
		private devicesModel:Model<devices, deviceKey>,
		@InjectModel('DeviceHistory')
		private devicesHistoryModel:Model<deviceHistory, deviceKey>,
	){
		super(devicesModel);
		this.historyService = new DeviceHistoryService(devicesHistoryModel);
	}
	async update(key: deviceKey, data: Partial<devices>, cond?: Partial<devices>){
		if (data.location) {
			const his:deviceHistory = {
				deviceid: key.deviceid,
				historyid: hashKey(),
				location: data.location,
				ts: new Date().getTime(),
			}
			// console.log('his:', his);
			await this.historyService.create(his);
		}
		return super.update(key, data, cond);
	}
	getHistory(key:deviceKey|ConditionInitializer){
		return this.historyService.query(key);
	}
}