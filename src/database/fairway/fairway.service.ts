import { Injectable } from "@nestjs/common";
import { defaultKey, defaultMethod, fairwayInfo } from "../db.interface";
import { InjectModel, Model } from "nestjs-dynamoose";
import { commonResWithData } from "src/models/if";
import { ErrCode } from "src/models/enumError";
import { errorMsg } from "src/function/Errors";

@Injectable()
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
		/*
		const resp:commonResWithData<fairwayInfo[]> = {
			errcode: '0',
		}
		this.fairwayModel.query(keys).exec((err, res) => {
			if (err) {
				resp.errcode = ErrCode.DATABASE_ACCESS_ERROR;
				resp.error = {
					message: errorMsg('DATABASE_ACCESS_ERROR'),
					extra: err,
				}
			} else {
				resp.data = res.map((itm) => itm);
			}
		});	
		return resp;
		*/
	}
}