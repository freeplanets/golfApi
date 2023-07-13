import { defaultKey, defaultMethod } from "../database/db.interface";
import { ErrCode } from "../models/enumError";
import { commonResWithData } from "../models/if";
import { errorMsg } from "./Errors";

export async function modifyTableData<D extends defaultKey>(dbservice:any, data:D):Promise<commonResWithData<D>> {
	console.log('modifyTableData', data);
	const resp:commonResWithData<D> = {
		errcode: '0',		
	}
	if (data.id) {
		const service = (dbservice as defaultMethod<D, defaultKey>);
		const key:defaultKey = {
			id: data.id,
		}
		try {
			if (key) {
				const foundResult = await	service.findOne(key)
				if (foundResult) {
					delete data.id;
					resp.data = await service.update(key, data);
				} else {
					resp.data = await service.create(data); 
				}
			} else {
				resp.errcode = ErrCode.MISS_PARAMETER;
				resp.error = {
					message: errorMsg('MISS_PARAMETER', 'id'),
				}
			}
		} catch (e) {
			resp.errcode = ErrCode.DATABASE_ACCESS_ERROR;
			resp.error = {
				message: errorMsg('DATABASE_ACCESS_ERROR'),
				extra: e,				 
			}
			console.log(e);
		}
	} else {
		resp.errcode = ErrCode.MISS_PARAMETER;
		resp.error = {
			message: errorMsg('MISS_PARAMETER', 'id'),
		}
	}
	return resp;
}