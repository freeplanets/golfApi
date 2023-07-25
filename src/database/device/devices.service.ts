import { Injectable } from "@nestjs/common";
import defaultService from "../common/defaultService";
import { deviceKey, devices } from "../db.interface";
import { InjectModel, Model } from "nestjs-dynamoose";

@Injectable()
export default class DevicesService extends defaultService<devices, deviceKey> {
	constructor(
		@InjectModel('Devices')
		private devicesModel:Model<devices, deviceKey>,
	){
		super(devicesModel);
	}
}