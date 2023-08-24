import { Injectable } from "@nestjs/common";
import defaultService from "../common/defaultService";
import { InjectModel, Model } from "nestjs-dynamoose";
import { deviceHistory, deviceKey } from "../db.interface";

@Injectable()
export default class DeviceHistoryService extends defaultService<deviceHistory, deviceKey> {
	constructor(
		@InjectModel('DeviceHistory')
		private deviceHistoryModel:Model<deviceHistory, deviceKey>,
	) {
		super(deviceHistoryModel);
	}
}