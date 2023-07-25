import { Injectable } from "@nestjs/common";
import { InjectModel, Model } from "nestjs-dynamoose";
import { cartKey, carts } from "../db.interface";
import defaultService from "../common/defaultService";

@Injectable()
export default class CartsService extends defaultService<carts, cartKey> {
	constructor(
		@InjectModel('Carts')
		private cartsModel:Model<carts, cartKey>,
	){
		super(cartsModel);
	}
}