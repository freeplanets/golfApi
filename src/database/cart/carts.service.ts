import { Injectable } from "@nestjs/common";
import { InjectModel, Model, ModelUpdateSettings } from "nestjs-dynamoose";
import { cartKey, carts, deviceKey } from "../db.interface";
import { Condition } from "dynamoose";
import defaultService from "../common/defaultService";
import { positonReq } from "../../models/if";
import DevicesService from "../device/devices.service";


@Injectable()
export default class CartsService extends defaultService<carts, cartKey> {
	
	constructor(
		@InjectModel('Carts')
		private cartsModel:Model<carts, cartKey>,
		private deviceService:DevicesService,
	){
		super(cartsModel);
		// this.deviceService = new DevicesService(deviceModel, deviceHistoryModel);
	}
	
	async create(data: carts): Promise<carts> {
		return super.create(data);
	}

	async update(key: cartKey, data: Partial<carts>, cond?: Partial<carts>): Promise<carts> {
			let conds:ModelUpdateSettings | any = null;
			if (cond) {
				const condition = new Condition(cond).eq(true);
				conds = { return: 'item', condition: condition};
			}
			if (conds) {
				console.log('update with cond', conds);
				return super.update(key, data, conds);
			} else {
				return super.update(key, data);
			}
	}
	async positionUpdate(deviceid:string, data:positonReq){
		const partialCart:Partial<carts> = {
			zoneid: data.zoneid,
			fairwayno: data.fairwayno,
			location: data.location,
			distance: data.distance,
		}
		if (data.location) {
			await this.deviceService.update({deviceid}, {location: data.location});
		}
		const device = await this.deviceService.findOne({deviceid});
		if (device) {
			if (device.cartid) {
				const cart = await super.update({cartid: device.cartid}, data);
			}
			if (data.zoneid && data.fairwayno) {
				const fields = ['cartid', 'cartName', 'zoneid', 'fairwayno', 'location', 'distance'];
				return super.query({zoneid: data.zoneid, fairwayno: data.fairwayno}, fields);
			}
		}
	}
	async getHistroy(deviceid:string, start:number, end:number) {
		const key:deviceKey = {
			deviceid,
		}
		const cond = new Condition(key).where('ts').between(start, end);
		return this.deviceService.getHistory(cond);
	}
	async queryHistory(siteid:string) {
		const cond = new Condition({ siteid });
		const ans = await this.deviceService.query(cond, ['deviceid']);
		if (ans.count > 0) {
			const ids = ans.map((itm) => itm.deviceid);
			const today = new Date().toLocaleDateString();
			const start = new Date(`${today} 00:00:00`).getTime();
			const end = new Date(`${today} 23:59:59`).getTime();
			const cond = new Condition().where('deviceid').in(ids).and().where('ts').between(start, end);
			return this.deviceService.getHistory(cond);
		} else {
			return ans;
		}
	}
}