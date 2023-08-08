import { Injectable } from "@nestjs/common";
import { InjectModel, Model, ModelUpdateSettings } from "nestjs-dynamoose";
import { cartHistory, cartKey, carts } from "../db.interface";
import { hashKey } from "../../function/Commands";
import { Condition, transaction } from "dynamoose";
import { TransactionReturnOptions, TransactionSettings } from "dynamoose/dist/Transaction";
import defaultService from "../common/defaultService";
import { positonReq } from "src/models/if";

const transSet:TransactionSettings = {
	return: TransactionReturnOptions.items,
}

@Injectable()
export default class CartsService extends defaultService<carts, cartKey> {
	constructor(
		@InjectModel('Carts')
		private cartsModel:Model<carts, cartKey>,
		@InjectModel('CartHistory')
		private cartHistoryModel:Model<cartHistory, cartKey>
	){
		super(cartsModel);
	}
	
	async create(data: carts): Promise<carts> {
		const carth = this.createHistoryData(data);
		await this.cartsModel.create(data);
		await this.cartHistoryModel.create(carth);
		/*
		await transaction([
			this.cartsModel.transaction.create(data),
			this.cartHistoryModel.transaction.create(carth),
		], transSet);
		*/
		return super.findOne({cartid: data.cartid});
	}

	async update(key: cartKey, data: Partial<carts>, cond?: Partial<carts>): Promise<carts> {
		if (data.status !== undefined) {
			const carth = this.createHistoryData(data as carts);
			let conds:ModelUpdateSettings | any = null;
			if (cond) {
				const condition = new Condition(cond).eq(true);
				conds = { return: 'item', condition: condition};
			}
			await this.cartsModel.update(key, data, conds);
			await this.cartHistoryModel.create(carth);
			/*
			const ans = await transaction([
				this.cartsModel.transaction.update(key, data, conds),
				this.cartHistoryModel.transaction.create(carth),
			], transSet);
			console.log('update trans:', ans);
			*/
			return super.findOne(key);
		} else {
			return super.update(key, data, cond);
		}
	}
	async positionUpdate(data:positonReq){
		const partialCart:Partial<carts> = {
			zoneid: data.zoneid,
			fairwayno: data.fairwayno,
			location: data.location,
			distance: data.distance,
		}
		const key:cartKey = {
			cartid: data.cartid,
		}
		const carth = this.createHistoryData((data as unknown) as carts);
		await this.cartsModel.update(key, partialCart);
		await this.cartHistoryModel.create(carth);
		/*
		const ans = await transaction([
			this.cartsModel.transaction.update(key, partialCart),
			this.cartHistoryModel.transaction.create(carth),
		], transSet);
		console.log(ans);
		*/
		const fields = ['cartid', 'cartName', 'zoneid', 'fairwayno', 'location', 'distance'];
		return super.query({zoneid: data.zoneid, fairwayno: data.fairwayno}, fields);
	}
	async getHistroy(cartid:string, start:number, end:number) {
		const key:cartKey = {
			cartid,
		}
		const cond = new Condition(key).where('ts').between(start, end);
		return this.cartHistoryModel.query(cond).exec();
	}
	createHistoryData(data:carts) {
		const dat:cartHistory = {
			carthistoryid: hashKey(),
			cartid: data.cartid,
			//status: data.status,
			ts: new Date().getTime()/1000,
		}
		if (data.status !== undefined) dat.status = data.status;
		if (data.location !== undefined) dat.location = data.location;
		return dat;
	}
}